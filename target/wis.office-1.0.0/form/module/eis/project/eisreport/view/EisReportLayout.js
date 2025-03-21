Ext.define('module.eis.project.eisreport.view.EisReportLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-eisreport-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">수주현황</span>',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-eisreport-lister-master', /*  상단  */
										flex	: 1,
										region	: 'center',
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-eisreport-lister-detail',
										region	: 'east',
										split	: true,
										flex	: 1,
									}
								]
							}
						],
						listeners:{
							render:function(){
								var listermaster	= Ext.ComponentQuery.query('module-eisreport-lister-master')[0] ,
									listerdetail	= Ext.ComponentQuery.query('module-eisreport-lister-detail')[0]
								;
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
								mask.show();
								listermaster.select({
									callback:function(records, operation, success) {
										if (success) {
										} else {
										}
									}, scope:me
								}, Ext.merge({stor_id : _global.stor_id}) );
								listerdetail.select({
									callback:function(records, operation, success) {
										if (success) {
										} else {
										}
										mask.hide();
									}, scope:me
								}, Ext.merge({stor_id : _global.stor_id,work_ordr_dvcd : listerdetail.down('[name=ordr_dvcd]').getValue()}) );
								window.stop = 0;
								window.settime = setInterval(function(){
									var tpanel	= Ext.ComponentQuery.query('module-eisreport-layout')[0].down('#mainpanel'),
										tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
									;
									tindex++;
									if(tindex == 4){
										tindex = 0;
									}
										tpanel.setActiveTab(tindex);
								}, 300000);
							}
						}
					},{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">공정 현황</span>',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-eisreport-lister-detail2', /*  상단  */
										flex	: 1,
										split	: true,
										region	: 'west',
										hidden	: false,
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-eisreport-lister-detail4',
										split	: true,
										hidden	: true,
										region	: 'west',
										flex	: 1,
									},{	xtype	: 'module-eisreport-lister-detail3',
										split	: true,
										region	: 'center',
										flex	: 1,
									},{	xtype	: 'module-eisreport-lister-detail5',
										split	: true,
										hidden	: true,
										region	: 'center',
										flex	: 1,
									}
								]
							}
						]
					},{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">설비별 현황</span>',
						layout	: 'border',
						hidden	: false,
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								xtype	: 'module-eisreport-lister-detail6', /*  상단  */
								flex	: 1,
								split	: true,
							}
						]
					},{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">설계 현황</span>',
						layout	: 'border',
						hidden	: false,
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								xtype	: 'module-eisreport-lister-detail7', /*  상단  */
								flex	: 1,
								split	: true,
							}
						]
					},{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">실시간 가동현황</span>',
						layout	: 'border',
//						hidden	: !(_global.hqof_idcd=='N1000DOWON'),
						hidden	: _global.hqof_idcd.toUpperCase() != 'N1000DOWON',
						border	: 0,
						items	: [
							{	region	: 'north',
								border	: 0,
								xtype: 'module-eisreport-chartsearch',
								height	: 60,
								split	: true,
							},{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype : 'module-eisreport-chart1', /*  상단  */
										flex	: 5,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right //Const.borderLine.left +
									},{	xtype : 'module-eisreport-runnstop', /*  상단  */
										flex	: 1,
										split	: true,
										region	: 'center',
									}
								]
							},{ height	: 350,
								region : 'south',
								layout : 'border',
								items	: [
									{	region	: 'center',
										layout	: 'border',
										border	: 0,
										items	: [
											{	xtype : 'module-eisreport-chart2',
												flex	: 5,
												split	: true,
												region	: 'west',
												style	: Const.borderLine.right //Const.borderLine.left +
											},{	xtype : 'module-eisreport-runndata',
												flex	: 1,
												split	: true,
												region	: 'center',
											}
										]
									},
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});