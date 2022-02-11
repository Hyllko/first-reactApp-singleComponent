class App extends React.Component {
	constructor(props) {
		super(props);

		// stav = variables

		this.input = React.createRef(); // referencia pre konkretny element

		// "variables"
		this.state = {
			inputText: "",
			list: [],
		};
	}

	// funkcia na ulozenie aktualnej hodnoty z inputu
	handleChange = (e) => {
		// seState ako object: do stavu ukladam novu hodnotu
		this.setState({ inputText: e.target.value });
	};

	// funkcia pre odoslanie formularu
	handleSubmit = (e) => {
		e.preventDefault(); // zamedzenie default akcii

		if (!this.state.inputText) return; // zamedzenie odoslania prazdneho inputu

		// zmena hodnoty v poli cez funckiu setState
		// kedze potrebujem na pracu aj aktualnu hodnotu stavu
		this.setState((prevState) => {
			return {
				list: [...prevState.list, this.state.inputText],
			};
		});

		this.resetForm();
	};

	// premazanie inputu a nasledny focus pre dalsie pisanie
	resetForm = () => {
		this.setState({ inputText: "" });
		this.input.current.focus();
	};

	// vymazanie polozky v zozname na kliknutie
	handleClick = (text) => {
		//setState function
		this.setState((prevState) => {
			return {
				// odfiltruj polozku ktora sa rovna textu polozky
				list: prevState.list.filter((item) => item !== text),
			};
		});
	};

	// jsx sablona na vkladanie poloziek do zoznamu
	listItems = () => {
		return this.state.list.map((item, index) => (
			<li key={index + 1}>
				{item}
				<a href="#" onClick={() => this.handleClick(item)}>
					X
				</a>
			</li>
		));
	};

	// template
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						autoFocus
						ref={this.input}
						type="text"
						onChange={this.handleChange}
						placeholder="write somethings"
						value={this.state.inputText}
					/>
				</form>
				<ul>{this.listItems()}</ul>
			</div>
		);
	}
}

// pripnutie componentu do elementu z ID app
ReactDOM.render(<App />, document.getElementById("app"));
