import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            visitorName:'',
            hostName:'',
            checkOut:false
        }
        this.onButtonClick = this.onButtonClick.bind(this);


    }

    componentDidMount(){
        this.setState({id:this.props.location.state.res1.entry,
            visitorName:this.props.location.state.visitorName,
        hostName:this.props.location.state.hostName});
    }


    
    onButtonClick = async()=>{
        await axios.post("http://localhost:8000/entry/checkout", {id:this.state.id},
        { headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                  }
        }
        ).then(res => {
            if (res.status === 200) {console.log(res);this.setState({checkOut:true});
    }
})
       }

    render(){

        if(this.state.checkOut){
            return <Redirect to = {{ pathname: "/",
          }} />;
  
          }
  

        return(
            <div><h3 className="heading">AvenueX</h3><hr className="line"/>
        <div className="form-body welcome"> <h2>Hello {this.state.visitorName}!</h2>
        <h3>Welcome to Innovaccer.</h3>
        <h4>Your host {this.state.hostName} has been notified via mail and sms</h4>
        
        <button onClick={this.onButtonClick} value={this.props.location.state.res1.entry} className="submit-button">Checkout</button>
        </div></div>
        );
    }
}

export default Dashboard;