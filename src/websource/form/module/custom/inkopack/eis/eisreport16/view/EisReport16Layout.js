Ext.define('module.custom.inkopack.eis.eisreport16.view.EisReport16Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport16-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-eisreport16-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">종합현황</span>',
						xtype	: 'module-eisreport16-lister-master',
						/*layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-eisreport16-lister-master',   상단
										flex	: 100,
										split	: false,
										region	: 'west',
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-eisreport16-lister-detail',
										split	: true,
										region	: 'center',
										flex	: 1,
									}
								]
							}
						],
						listeners:{
							render:function(){
								var listermaster	= Ext.ComponentQuery.query('module-eisreport16-lister-master')[0] ,
									listerdetail	= Ext.ComponentQuery.query('module-eisreport16-lister-detail')[0]
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
									var tpanel	= Ext.ComponentQuery.query('module-eisreport16-layout')[0].down('#mainpanel'),
										tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
									;
									tindex++;
									if(tindex == 4){
										tindex = 0;
									}
										tpanel.setActiveTab(tindex);
								}, 300000);
							}
						}*/
					}
				]
			}
		];
		me.callParent(arguments);
	}
});