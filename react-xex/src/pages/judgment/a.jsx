import React, { Component } from 'react';
import Checkbox from './Checkbox';
import {reqJudgment,reqJudgmentModify,reqJudgmentDetail,reqIndustry,reqFieldType,reqDataType} from '../../api'
const items = [];

class Application extends Component {
    state = {
        data:[], // 规则详情
        datatypes:[], //数据类型
        fieldtypes:[], //字段类型
        industrys:[], //行业类别
        judgmentdetail:[],
        checkedBoxes: []
      }
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    this.getDataTypes()
    this.getFieldTypes()
    this.getJudgmentDetail(1)
  }
  getDataTypes = async (id) => {
    const result = await reqDataType(id)   // {status: 0, data: categorys}
    if (result.code===1) {
      const datatypes = result.data.list
      // 所有数据
      this.setState({
      datatypes
      })
    }
  }
  getFieldTypes = async (id) => {
    const result = await reqFieldType(id)   // {status: 0, data: categorys}
    if (result.code===1) {
      const fieldtypes = result.data.list
      // 所有数据
      this.setState({
        fieldtypes
      })
    }
  }


  getJudgmentDetail = async (id) => {
    const result = await reqJudgmentDetail(id)   // {status: 0, data: categorys}
    if (result.code===1) {
      const judgmentdetail = result.data
      // 所有数据
      this.setState({
        judgmentdetail

      })
    }
  }

  


  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

  render() {
      const {datatypes,fieldtypes,judgmentdetail} = this.state
      
      console.log("1----1",judgmentdetail)
    //   var array1 = [];
    //   array1 =judgmentdetail.datas_1
    //   var found = array1.find(function (element) {
    //   return element > 1;
    // });
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">


            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
               
          
               
              <button className="btn btn-default" type="submit">Save</button>
            </form>

            {judgmentdetail.datas_1}

            {fieldtypes.map((fieldtypes) => (
                
            <label key={Math.random()}>
              <input type="checkbox" name="checked"  value={fieldtypes.id} />
              {fieldtypes.tits}
            </label>
                  ))}

        {fieldtypes.map((fieldtypes) => (

              <label key={Math.random()}>
              <input type="checkbox" name="checked" defaultChecked value={fieldtypes.id} />
              {fieldtypes.tits}
              </label>
               
        ))}
                     
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
