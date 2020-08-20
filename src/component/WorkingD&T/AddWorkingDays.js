import React from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import 'font-awesome/css/font-awesome.min.css'
import * as firebase from 'firebase'
import {Container,Row,Col} from "reactstrap";
import {Button, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoadingScreen from 'react-loading-screen'
import {
  ChangeHistoryRounded, DateRangeRounded,
  DeleteForeverRounded, HomeRounded, HourglassEmptyRounded, RouterRounded,
  SaveOutlined,
  UpdateOutlined,
  UpdateSharp
} from "@material-ui/icons";
import HomePage from "../Home/HomePage";

const options = [
  {
    label: 'WeekDays',
    options: [
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' }

    ]
  },
  {
    label: 'Weekend',
    options: [
      { value: 'Saturday', label: 'Saturday' },
      { value: 'Sunday', label: 'Sunday' }
    ]
  }
]

export default class AddWorkingDays extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: [],
      loading: true,
      isSetData: false,
      isUpdate:true
    }
  }

  onChange = (selected) => {
    this.setState({ selected })
  };

  componentDidMount() {
    this.getData()
  }

  render() {
    const { selected, loading, isSetData, isUpdate } = this.state

    return (
      <div className={'container-fluid'}>
        <LoadingScreen
            loading={loading}
            bgColor='#ffffff'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            text='Loading Data'
        >
          <Container>
            <Typography style={{fontFamily:'Lucida Bright'}} component="h1" variant="h4" align="center">
              Working Dates
            </Typography>
            {
              this.warning()
            }
            <DualListBox
              options={options}
              selected={selected}
              onChange={this.onChange}
              disabled={this.state.isSetData && this.state.isUpdate}
              icons={{
                moveLeft: <span className="fa fa-chevron-left"/>,
                moveAllLeft: [
                  <span key={0} className="fa fa-chevron-left"/>,
                  <span key={1} className="fa fa-chevron-left"/>
                ],
                moveRight: <span className="fa fa-chevron-right"/>,
                moveAllRight: [
                  <span key={0} className="fa fa-chevron-right"/>,
                  <span key={1} className="fa fa-chevron-right"/>
                ],
                moveDown: <span className="fa fa-chevron-down"/>,
                moveUp: <span className="fa fa-chevron-up"/>
              }}
            />
            <p  className={"d-flex justify-content-center"} style={{margin:'10px',display:'inline', fontFamily:'Candara',fontSize:'25px'}}>Total  Days of a Week  :  <strong style={{fontSize:'25px'}}> {this.state.selected.length}</strong></p>

            <Row style={{marginTop:'10px'}} className={'d-flex justify-content-center'}>
              <Col sm="auto"  >
                <Button
                variant="outlined"
                color="primary"
                startIcon={<SaveOutlined />}
                onClick={this.onSave}
                hidden={isSetData}
                style={{marginTop:'10px'}}
                >
                  Save
                </Button>
              </Col>
            </Row>

            <Row style={{marginTop:'10px'}} className={'d-flex justify-content-center'}>
              <Col sm="auto" >
                <Button
                variant="outlined"
                color="primary"
                startIcon={<UpdateOutlined />}
                onClick={this.accessUpdate}
                hidden={!isUpdate || !isSetData}
                style={{marginTop:'10px'}}
                >
                  Do You Want To update
                </Button>
              </Col>
            </Row>

            <Row style={{marginTop:'10px'}} className={'d-flex justify-content-center'}>
              <Col sm="auto" >
                <Button
                variant="outlined"
                color="primary"
                startIcon={<UpdateSharp />}
                onClick={this.updateDates}
                hidden={!isSetData || isUpdate}
                style={{marginTop:'10px'}}
                >
                  Update
                </Button>
              </Col>
            </Row>

            <Row style={{marginTop:'10px'}} className={'d-flex justify-content-center'}>
              <Col sm="auto" >
                <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteForeverRounded />}
                onClick={this.deletealls}
                hidden={!isSetData}
                style={{marginRight:'10px'}}
                >
                  Delete All
                </Button>
              </Col>
            </Row>

            <Row style={{marginTop:'20px'}} >

              <Button
                  variant="outlined"
                  color={"primary"}
                  startIcon={<HomeRounded />}
                  onClick={()=>this.props.history.push('/workingView')}
                  size={'small'}
              >
                MainView
              </Button>


              <Button style={{marginLeft:'auto'}}
                      variant="outlined"
                      color="primary"
                      startIcon={<HourglassEmptyRounded />}
                      onClick={()=>this.props.history.push('/workingTimes')}
                      size={'small'}
              >
                Working Hours
              </Button>

            </Row>

          </Container>
        </LoadingScreen>
      </div>
    )
  }

  getData = () => {
    console.log(this.state.loading)
    const day = []
    const ref = firebase.database().ref('Workingdays')

    ref.on('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(daySnapShot => {
          day.push(daySnapShot.key)

        })
        this.setState({ selected: day }, () => {
          this.setState({ loading: false, isSetData:true })
        })
      } else {
        console.log('hellow')
        this.setState({ isSetData: false }, () => this.setState({ loading: false }))
      }
    }, function(error) {
      if (error) {
        console.log('errroo')
        this.setState({ loading: false })
      } else {
        // Data saved successfully!
        console.log('Successfull')
      }
    })
  }

  onSave = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to Save Days',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            window.location.reload()
            this.setState({ loading: true }, () => {
              for (let i = 0; i < this.state.selected.length; i++) {
                firebase.database().ref('Workingdays/' + this.state.selected[i]).set({
                  day: this.state.selected[i]
                })
              }
              this.getData()
            })

          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  updateDates = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to Update  Working Days',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.setState({ loading: true }, () => {
              window.location.reload()
              firebase.database().ref('Workingdays').remove()
              for (let i = 0; i < this.state.selected.length; i++) {
                firebase.database().ref('Workingdays/' + this.state.selected[i]).set({
                  day: this.state.selected[i]
                })
              }
              this.getData()
            })
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  deletealls = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to Delete All Working Days',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.setState({ loading: true }, () => {
              window.location.reload()
              firebase.database().ref('Workingdays').remove().then(this.getData)
            })
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }



  warning = () => {
    return(
        <div>
          {
            this.state.isSetData ? (<Alert className={'d-flex justify-content-center'} style={{height:'40px',margin:'10px',textAlign:'center'}} severity="success">
              <p className={'text-center'} style={{textAlign:'center',paddingTop:'0px'}}>You Has Been Already Set Data</p>
            </Alert>) : (<Alert className={'d-flex justify-content-center'} style={{height:'40px',margin:'10px',textAlign:'center'}} severity="warning">
              <p className={'text-center'} style={{textAlign:'center',paddingTop:'0px'}}>  Please Select Working Days</p>
            </Alert>)
          }
        </div>
    )
  }

  accessUpdate = () => {
    if(this.state.isSetData){
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure to Update Working Daye',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  this.setState({isUpdate:false})
          },
          {
            label: 'No',
          }
        ]
      });
    }
  }

}
