/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{props.traveller.id}</td>
      <td>{props.traveller.name}</td>
      <td>{props.traveller.phone}</td>
      <td>{props.traveller.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = { name: '', phone: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const { name, phone } = this.state;
    const newTraveller = {
      id: Date.now(), // Generate a unique ID
      name,
      phone,
      bookingTime: new Date(),
    };
    this.props.bookTraveller(newTraveller);
    this.setState({ name: '', phone: '' });
    this.props.goToHomepage(); 
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
      <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
          required
        />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    this.props.deleteTraveller(this.state.name);
    this.setState({ name: '' });
    this.props.goToHomepage(); 
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor(props) {
	super(props);
  this.state = {
    totalSeats: 10, // Total number of seats
    occupiedSeats: props.travellers.length, // Number of occupied seats from the props
   };
	}
	render(){
  const freeSeats = this.state.totalSeats - this.state.occupiedSeats;
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <p>Free Seats: {freeSeats}</p>
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { 
      travellers: initialTravellers, 
      selector: 1
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
    this.goToHomepage = this.goToHomepage.bind(this);  
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({selector: value});
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState(prevState => ({
        travellers: [...prevState.travellers, passenger],
      }));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const travellerIndex = this.state.travellers.findIndex(traveller => traveller.name === passenger);
  
    if (travellerIndex !== -1) {
      // Make a copy of the array to avoid mutating state directly
      const updatedTravellers = [...this.state.travellers];
      
      // Remove the traveller at the found index
      updatedTravellers.splice(travellerIndex, 1);
      
      // Update the state with the modified travellers list
      this.setState({ travellers: updatedTravellers });
    } else {
      alert(`Traveller:${passenger} not found`);
    }
  }

  goToHomepage() {
    this.setState({ selector: 1 });  // Set selector to 1 to render homepage
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        {/* Only show the navigation buttons if the selector is not '3' */}
        {this.state.selector !== 3 && (
          <div>
            <button onClick={() => this.setSelector(1)}>Homepage</button>
            <button onClick={() => this.setSelector(2)}>Display Travellers</button>
            <button onClick={() => this.setSelector(3)}>Add Traveller</button>
            <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
          </div>
        )}
        <div>
          {/* Render components based on selected value */}
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers}/>}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} goToHomepage={this.goToHomepage} />}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} goToHomepage={this.goToHomepage}/>}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
