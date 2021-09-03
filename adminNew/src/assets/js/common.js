export default {
    getSJC(strtime){//日期转时间戳格式
        var d = new Date(strtime);
        var year = d.getFullYear()+'-'+parseInt(d.getMonth()+1)+'-'+ d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var date = new Date(year); 
        var date = new Date(year.replace(/-/g, '/'));
        return Math.round(Date.parse(date)/ 1000) ;
    },
    getRQ(date) {//时间戳转日期格式
        if(date==''||date==null){
            return ""
        }
            let _date = new Date(parseInt(date*1000));
            let y = _date.getFullYear(); 
            let m = _date.getMonth() + 1; 
            m = m < 10 ? ('0' + m) : m;
            let d = _date.getDate(); 
            d = d < 10 ? ('0' + d) : d;
            let h = _date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let minute = _date.getMinutes(); 
            let second = _date.getSeconds(); 
            minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second; 
        // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second) 
            let dates = y + '-' + m + '-' + d+"  "+h+":"+minute;
            return dates;
    }
}
