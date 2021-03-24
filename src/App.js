import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import BarChart from "./components/barChart/barChart"
import CopyToClipboard from "./components/copyToClipboard/clipboard"
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<Switch>
					<Route exact path="/">
						<BarChart />
					</Route>
					<Route path="/copy-to-clipboard">
						<CopyToClipboard />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
