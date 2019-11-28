import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={visitorName:'',
        visitorEmail:'',
        visitorPhone:'',
        hostName:'',
        hostEmail:'',
        hostPhone:'',
        resReceived:false,
        res1:{}
        


        }
    }


    postFormData = async()=>{
        await axios.post("http://localhost:8000/entry", {name:this.state.visitorName,
        email:this.state.visitorEmail,
        phone:this.state.visitorPhone,
        hostname:this.state.hostName,
        hostemail:this.state.hostEmail,
        hostphone:this.state.hostPhone},
        { headers: 
            { 
                Accept: 'application/json',
                'Content-Type': 'application/json',
                  }
        }
        ).then(res => {
            if (res.status === 200) {console.log(res);
              this.setState({ res1:res.data,resReceived:true});
    }
})
       }



    onFormSubmit=(event)=>{
        event.preventDefault();
        this.postFormData();
    }
    

    render(){

        if(this.state.resReceived){
            return <Redirect to = {{ pathname: "/dashboard",
          state:{res1:this.state.res1,visitorName:this.state.visitorName,hostName:this.state.hostName}
          }} />;
  
          }
  
        return(
            <div><h3 className="heading">AvenueX</h3><hr className="line"/>
                <div className="container form-body">
                <form onSubmit={this.onFormSubmit}>
                    <center><h4>Visitor Details</h4></center><hr/>
                    <div className="wrap-input">
                   <input type="text"
                   className="input-100"
                   placeholder="Your Name"
                   required
                                value={this.state.visitorName}
                                onChange={e => this.setState({visitorName:e.target.value})}
                   
                   />
                   </div>
                   <div className="wrap-input">
                   <input type="email"
                                    className="input-100"
                                    placeholder="Your email"
                                    required
                                           value={this.state.visitorEmail}
                                           onChange={e => this.setState({visitorEmail:e.target.value})}
                   />
                   </div>
                   <div className="wrap-input">
                   <input type="text"
                   className="input-100"
                   placeholder="Your contact number"
                   required
                   pattern="[1-9]{1}[0-9]{9}"
                                           value={this.state.visitorPhone}
                                           onChange={e => this.setState({visitorPhone:e.target.value})}
                   />
                   </div>
                   <center><h4>Host Details</h4></center><hr/>
                   <div className="wrap-input">
                    <input type="text"
                   className="input-100"
                   placeholder="Hostname"
                   required
                                value={this.state.hostName}
                                onChange={e => this.setState({hostName:e.target.value})}
                   
                   />
                   </div>
                   <div className="wrap-input">
                    <input type="email"
                   className="input-100"
                   placeholder="Host email"
                   required
                                           value={this.state.hostEmail}
                                           onChange={e => this.setState({hostEmail:e.target.value})}
                   />
                   </div>
                   <div className="wrap-input">
                   <input type="text"
                   className="input-100"
                   placeholder="Host contact number"
                   required
                   pattern="[1-9]{1}[0-9]{9}"
                                           value={this.state.hostPhone}
                                           onChange={e => this.setState({hostPhone:e.target.value})}
                   /></div>
                    <center><button type="submit" className="submit-button">Submit</button></center>

                </form>
                </div>
            </div>
        );
    }
}

export default Home;