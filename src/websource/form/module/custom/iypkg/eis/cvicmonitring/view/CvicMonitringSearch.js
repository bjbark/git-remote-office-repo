Ext.define('module.custom.iypkg.eis.cvicmonitring.view.CvicMonitringSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-cvicmonitring-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic()];
		me.callParent();
	},

	listeners:{
		render:function(){
			var listermaster = Ext.ComponentQuery.query('module-cvicmonitring-lister-master')[0]
			;
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
					}
					else {}
				}, scope:this
			}, Ext.merge( {stor_id : _global.stor_id}) );
			window.time= null
			window.time = setInterval(function(){
				listermaster.select({
					callback:function(records, operation, success) {
						if (success) {
						}
						else { }
					}, scope:this
				}, Ext.merge( {stor_id : _global.stor_id}) );
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
				height	: 80
				,xtype	: 'panel'
				,itemId : 'info2'
				,border	: 0
				,layout : 'border'
				,items	: [
					{	layout	: 'hbox',
						region	: 'center',
						flex	: 2,
						id		: 'eisDetailLookup',
						minWidth	: 600,
						items	: [
							{	xtype	:'label',
								text	: '('+Ext.Date.format(new Date(),'Y-m-d')+' '+dayname+')'+'설비가동현황',
								style	: 'text-align:center; font-size:5em;',
								cls		: 'textTemp',
								margin	: '0 0 0 500',
								listeners:{
									render:function(field,val){
										var today = null;
										today = setInterval(function(){
											if(me.ownerCt){
												field.setText('('+Ext.Date.format(new Date(),'Y-m-d')+' '+dayname+')'+' 설비가동현황');
											}else{
												clearInterval(today);
											}
										}, 1000)
									}
								}
							},{	xtype		: 'button',
								text		: '<span class="btnTemp" style="font-size:25px;">새로고침</span>',
								cls			: 'button-center btn btn-danger',
								width		: 170,
								height		: 50,
								margin		: '18 40 0 100',
								action		: 'selectAction'
							},{	xtype		: 'button',
								text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
								cls			: 'button-center btn btn-danger',
								width		: 150,
								height		: 50,
								margin		: '18 150 0 10',
								style		: 'text-decoration:none;',
								handler:function(){
									var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
									sideButton.click();
									clearInterval(window.eisInterval);
									me.up('panel').up('panel').close();
								}
							}
						]
					}
				]
			}
		;
		return line;
	},

	reload : function(){
		var me = this
			listermaster	= Ext.ComponentQuery.query('module-cvicmonitring-lister-master')[0]
		;
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