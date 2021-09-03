import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import JudgmentHome from './judgmentlist'
import JudgmentDetail from './detail'
import JudgmentType from './fieldtype'
import JudgmentData from './datatype'
import JudgmentIndustry from './industry'
import JudgmentAddUpdate from './judgment-update'
import Judgmentapp from './a'
import JudgmentAdd from './judgmentadd'
import './judgment.less'

/*
订单路由
 */
export default class Judgment extends Component {
  render() {
    return (
      <Switch>
        <Route path='/judgment' component={JudgmentHome} exact/> {/*路径完全匹配*/}
        <Route path='/judgment/detail' component={JudgmentDetail}/>
        <Route path='/judgment/fieldtype' component={JudgmentType}/>
        <Route path='/judgment/datatype' component={JudgmentData}/>
        <Route path='/judgment/industry' component={JudgmentIndustry}/>
        <Route path='/judgment/judgmentaddupdate' component={JudgmentAddUpdate}/>
        <Route path='/judgment/judgmentadd' component={JudgmentAdd}/>
        <Route path='/judgment/a' component={Judgmentapp}/>
        <Redirect to='/judgment'/>
      </Switch>
    )
  }
}