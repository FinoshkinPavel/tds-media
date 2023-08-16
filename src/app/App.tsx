import s from "./App.module.scss";
import { AddContactForm } from "../components/AddContactForm/AddContactForm";
import { UITable } from "../components/Table/Table";
import { Routes, Route } from "react-router-dom";
function App() {
	return (
		<div className={s.appWrap}>
			<Routes>
				<Route path="/" element={<UITable />} />
				<Route path="/new-contact" element={<AddContactForm />} />
				<Route path="/*" element={<div>error!</div>} />
			</Routes>
		</div>
	);
}

export default App;
