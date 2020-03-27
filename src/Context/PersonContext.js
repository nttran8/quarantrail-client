import React, { Component } from 'react'

const PersonContext= React.createContext({
    starter:{},
    error: null,
    name: '',
    day:1,
    dailyActivities: 0,
    setName: () => {},
    setPersonInfo: () => {},
    setError: () => {},
    clearError: () => {},
    addToHealth:()=>{},
    addToFood:()=>{},
    addToToilet:()=>{},
    incrementDay:()=>{},
    addToFoodandToilet:()=>{},
    addToBoredom:() => {},
    dailyTakeAwayFoodandToilet: () => {},
})

export default PersonContext

export class PersonProvider extends Component {
    state = {
      starter:{},
      error: null,
      name: '',
      day:0,
      dailyActivities: 0,
    }

    setName = user => {
      this.setState({name: user})
    }
    setPersonInfo = info =>{
      this.setState({starter:info})
    }

    setError = error => {
      console.error(error)
      this.setState({ error })
    }

    clearError = () => {
      this.setState({ error: null })
    }
    addToHealth = health => {
      let newHealth = this.state.starter.health;
      if(health>0 && newHealth === 100) {
        return
      }
      if(health<0 && newHealth === 0) {
        return
      }
      newHealth+=health;
      this.setState({
        starter:{
          ...this.state.starter,
          health:newHealth
        }
      })
    }

    addToBoredom = value => {
      let newBoredom = this.state.starter.boredom;
      if(value>0 && newBoredom === 100) {
        return
      }
      if(value<0 && newBoredom === 0) {
        return
      }
      newBoredom+=value;
      this.setState({
        starter:{
          ...this.state.starter,
          boredom:newBoredom
        }
      })
    }

    addToFood = foods =>{
      let newerFood = this.state.starter.food;
      console.log(newerFood);
      newerFood+=foods;
      console.log('newerFood(after adding to old food):', newerFood);
      this.setState({
        starter:{
          ...this.state.starter,
          food:newerFood
        }
      })
      console.log('state(after):', this.state.starter.food)
    }

    addToToilet = toilet =>{
      let newToilet = this.state.starter.toiletpaper;
      newToilet+=toilet;
      this.setState({
        starter:{
          ...this.state.starter,
          toiletpaper:newToilet
        }
      })
    }
    addToFoodandToilet = (f,t)=>{
      let F=parseInt(f);
      let T=parseInt(t);
      let nT=this.state.starter.toiletpaper;
      let nF= this.state.starter.food;
      nT+=T;
      nF+=F;
      this.setState({
        starter:{
          ...this.state.starter,
          toiletpaper:nT,
          food:nF,
        }
      })
    }

    dailyTakeAwayFoodandToilet = (f,t)=>{
      // let F=parseInt(f);
      // let T=parseInt(t);
      let nT=this.state.starter.toiletpaper;
      let nF= this.state.starter.food;
      nT-=t;
      nF-=f;
      this.setState({
        starter:{
          ...this.state.starter,
          toiletpaper:nT,
          food:nF,
        }
      })
    }

    incrementDay = () =>{
      let newday =this.state.day;
      newday +=1;
      this.setState({day:newday})
    }

    incrementActivity = () => {
      let newCount = this.state.dailyActivities
      newCount += 1;
      this.setState({
        dailyActivities: newCount
      })
    }

    render() {
      const value = {
        starter: this.state.starter,
        error: this.state.error,
        name: '',
        day:this.state.day,
        dailyActivities: this.state.dailyActivities,
        incrementActivity: this.incrementActivity,
        setName: this.setName,
        setPersonInfo: this.setPersonInfo,
        setError: this.setError,
        clearError: this.clearError,
        addToFoodandToilet:this.addToFoodandToilet,
        addToHealth:this.addToHealth,
        addToFood:this.addToFood,
        addToToilet:this.addToToilet,
        incrementDay:this.incrementDay,
        addToBoredom:this.addToBoredom,
        dailyTakeAwayFoodandToilet: this.dailyTakeAwayFoodandToilet,
      }

      return (
        <PersonContext.Provider value={value}>
          {this.props.children}
        </PersonContext.Provider>
      )
    }  
  }
