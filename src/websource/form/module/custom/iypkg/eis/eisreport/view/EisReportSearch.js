Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-eisreport-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic()];
		me.callParent();
	},

	listeners:{
		destroy:function(){
			clearInterval(window.shot1);
			clearInterval(window.shot11);
			clearInterval(window.shot2);
			clearInterval(window.shot21);
			clearInterval(window.shot3);
			clearInterval(window.shot31);
			clearInterval(window.shot4);
			clearInterval(window.shot41);
			clearInterval(window.shot5);
			clearInterval(window.shot51);
			clearInterval(window.shot6);
			clearInterval(window.shot61);
		},
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 70,
				margin	: '10 40 0 30',
//				autoScroll: true,
				items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	xtype	:'label',
								text	: Ext.Date.format(new Date(),'Y')+'년 '+ Ext.Date.format(new Date(),'m')+'월 '+ Ext.Date.format(new Date(),'d')+'일 '
										+ Ext.Date.format(new Date(),'h')+'시 '+ Ext.Date.format(new Date(),'i')+'분 '+'설비가동현황',
								style	: 'text-align:center; font-size:4em;',
								cls		: 'textTemp',
								margin	: '0 0 0 300',
								listeners:{
									render:function(a,b){
										window.realTime = setInterval(function(){
											var y,m,d,h,i,s,date = new Date();

											y = date.getFullYear();
											m = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
											d = date.getDate()<10?'0'+date.getDate():date.getDate();
											h = date.getHours()<10?'0'+date.getHours():date.getHours();
											i = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
											s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();

											a.setText(y+'년  '+m+'월  '+d+'일  '+h+'시  '+i+'분'+'　설비가동현황');
										}, 100)
									},
								}
							}
						]
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 46,
						margin		: '10 0 0 0',
						style: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
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