Ext.define('module.prod.cvic.cvicmonitring.view.CvicMonitringSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-cvicmonitring-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
//		me.items =[ me.searchBasic(),me.createLine1(), me.createLine2(), me.addonSearch()];
		me.items =[ me.searchBasic()];
		me.callParent();
	},
	listeners:{
		render:function(){
			var me		= this,
				chart1	= Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringChart1'),
				chart2	= Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringChart2'),
				runndata	= Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringRunningData'),
				runnstop	= Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringRunnStopTime')
			;
			window.time= null
			window.time = setInterval(function(){
				var today = me.dateFormat();
				if(me.ownerCt){
					runndata.reload();
					runnstop.reload();
					chart1.load({
						params : {
							param:JSON.stringify({invc_date : today})
						},
						callback : function(records,operation,success){
						}
					})
					chart2.load({
						params : {
							param:JSON.stringify({invc_date : today})
						},
						callback : function(records,operation,success){
						}
					})
				}else{
					clearInterval(window.time);
				}
			}, 60000);
		},
		destroy: function(element) {
			clearInterval(window.time);
		},
	},
	searchBasic : function(){
		var me = this,
			dayname = me.dayname(),
			line = {
				xtype	: 'panel'
				,border	: 0
				,layout : 'fit'
				,region	: 'center'
				,width	: '100%'
				,items	: [
					{	xtype	:'label',
						text	: Ext.Date.format(new Date(),'Y-m-d')+' '+dayname+' 설비가동률',
						style	: 'text-align:center; font-size:3em;',
						cls		: 'textTemp',
						listeners:{
							render:function(field,val){
								var today = null;
								today = setInterval(function(){
									if(me.ownerCt){
										field.setText(Ext.Date.format(new Date(),'Y-m-d')+' '+dayname+' 설비가동률');
									}else{
										clearInterval(today);
									}
								}, 1000)
							}
						}
					}
				]
			}
		;
		return line;
	},
	dayname : function(){
		var today = new Date();
		var weekdays = new Array(7);
			weekdays[0] = "일요일";
			weekdays[1] = "월요일";
			weekdays[2] = "화요일";
			weekdays[3] = "수요일";
			weekdays[4] = "목요일";
			weekdays[5] = "금요일";
			weekdays[6] = "토요일";
		var r = weekdays[today.getDay()];
		return r;
	},
	dateFormat:function(){
		var date = new Date(),
			yyyy = date.getFullYear().toString(),
			mm = (date.getMonth()+1).toString(),
			dd = date.getDate().toString()
		;
		if(mm < 10){
			mm = '0'+mm;
		}
		if(dd < 10){
			dd = '0'+dd;
		}
		return yyyy+mm+dd;
	}
});