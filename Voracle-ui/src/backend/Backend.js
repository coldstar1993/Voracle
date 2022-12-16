import React, { useState } from "react";
import Config from "../Config";
import "./Backend.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

const Backend = _ => {
	const [isLogin, setIsLogin] = useState(false);
	const [inputName, setInputName] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [mailSubject, setMailSubject] = useState("")
	const [htmlContent, setHTMLContent] = useState("")
	const [token, setToken] = useState("");

	const handleChange = event => {
		const buttonId = event.target.id;

		if (buttonId === "userName") {
			setInputName(event.target.value);
		}

		if (buttonId === "userPassword") {
			setInputPassword(event.target.value);
		}

		if (buttonId === "mailSubject") {
			setMailSubject(event.target.value);
		}
	}

	const handleLogin = async _ => {
		const result = await (await fetch(Config.baseMailAPI + Config.loginAPI, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: inputName,
				password: inputPassword
			})
		})).json();

		if (result.token) {
			setToken(result.token);
			setIsLogin(true);
		} else {
			return window.alert("错误的用户名或密码，请联系管理员。");
		}
	}

	const receiveHtml = content => {
		setHTMLContent(content.html);
	}

	const handleDownloadContribution = async () => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		fetch(Config.baseMailAPI + Config.contributionURL, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		}).then(res => res.blob().then(blob => {
			const filename = "contributions.json";
			const a = document.createElement('a');
			const url = window.URL.createObjectURL(blob);
			a.href = url;
			a.target = "_blank";
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		}));
	}

	const downloadInvitation = async () => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		fetch(Config.baseMailAPI + Config.contributions, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		}).then(res => res.blob().then(blob => {
			const filename = "invitation.json";
			const a = document.createElement('a');
			const url = window.URL.createObjectURL(blob);
			a.href = url;
			a.target = "_blank";
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		}));
	}

	const handleDownload = async _ => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		fetch(Config.baseMailAPI + Config.csvURL, {
			method: "GET",
			headers: {
				'Content-Type': 'text/csv; charset=utf-8',
				'Authorization': token
			}
		}).then(res => res.blob().then(blob => {
			const filename = "users.csv";
			const a = document.createElement('a');
			const url = window.URL.createObjectURL(blob);
			a.href = url;
			a.target = "_blank";
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		}));
	}

	const handleSend = async _ => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		if (window.confirm("确认向所有用户群发此邮件吗？")) {
			const result = await (await fetch(Config.baseMailAPI + Config.sendMailAPI, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify({
					subject: mailSubject,
					content: htmlContent
				})
			})).json();

			if (result.status === 1) {
				window.alert("邮件已发送，正在群发中……");
			} else {
				console.warn(result.message);
			}
		}
	}

	const handleAddColumn = async event => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		if (window.confirm("确认添加ksm和ares字段吗？")) {
			const result = await (await fetch(Config.baseMailAPI + Config.runSql, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify({
					sql: 'ALTER TABLE addresses ADD COLUMN ksm TEXT;'
				})
			})).json();

			if (result.status === 1) {
				const result1 = await (await fetch(Config.baseMailAPI + Config.runSql, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': token
					},
					body: JSON.stringify({
						sql: 'ALTER TABLE addresses ADD COLUMN ares TEXT;'
					})
				})).json();

				if (result1.status === 1) {
					window.alert("字段已添加。");
				} else {
					console.warn(result.message);
				}
			} else {
				console.warn(result.message);
			}
		}
	};

	const handleCreateTable = async event => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		if (window.confirm("确认创建addresses表吗？")) {
			const result = await (await fetch(Config.baseMailAPI + Config.runSql, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify({
					sql: 'CREATE TABLE IF NOT EXISTS "addresses" ("id"	INTEGER NOT NULL UNIQUE, "owner"	TEXT NOT NULL, "data"	TEXT NOT NULL, "time"	INTEGER NOT NULL, PRIMARY KEY("id"));'
				})
			})).json();

			if (result.status === 1) {
				window.alert("数据表addresses已创建。");
			} else {
				console.warn(result.message);
			}
		}
	};

	const createInvitationTable = async () => {
		if (!token) {
			return window.alert("token不存在，请重新登录。");
		}

		if (window.confirm("确认创建invitation表吗？")) {
			const result = await fetch(Config.baseMailAPI + Config.creatInvitation, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
			});

			const res = await result.json();
			if (res.ok) {
				window.alert("数据表invitation已创建。");
			} else {
				console.warn(result.message);
			}
		}
	};


	const loginForm = (<div className="backendLoginForm">
		<input id="userName" placeholder="管理员用户名" onChange={handleChange} />
		<input id="userPassword" type="password" placeholder="管理员密码" onChange={handleChange} />
		<button onClick={handleLogin}>登录</button>
	</div>);

	const composeForm = (<div className="backendComposeForm">
		<input id="mailSubject" placeholder="邮件主题" onChange={handleChange} style={{ width: "100%" }} />

		<MdEditor style={{
			width: "100%",
			height: '500px'
		}}
			renderHTML={text => mdParser.render(text)}
			onChange={receiveHtml} />

		<div style={{
			display: "flex",
			justifyContent: "space-between",
			width: "100%"
		}}>
			<div>
				<button onClick={handleDownload}>下载用户数据文件</button>

				<button style={{ marginLeft: "1em" }} onClick={handleDownloadContribution}>下载contribution数据</button>
				<button style={{ marginLeft: "1em" }} onClick={downloadInvitation}>下载推荐人数据</button>

				<button style={{ marginLeft: "1em" }} onClick={handleCreateTable}>创建addresses表</button>
				<button style={{ marginLeft: "1em" }} onClick={createInvitationTable}>创建invitation表</button>

				<button style={{ marginLeft: "1em" }} onClick={handleAddColumn}>添加字段</button>

			</div>

			<button
				onClick={handleSend}
				disabled={!mailSubject || !htmlContent || htmlContent.length < 10}
				style={{ width: "100px" }}>群发邮件</button>
		</div>
	</div>)

	return (<div className="backendLayout">
		{!isLogin && loginForm}
		{isLogin && composeForm}
	</div>);
};

export default Backend;
