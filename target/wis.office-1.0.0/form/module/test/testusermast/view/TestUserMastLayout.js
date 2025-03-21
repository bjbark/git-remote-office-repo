Ext.define('module.test.testusermast.view.TestUserMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-testusermast-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			Ext.Ajax.request({
//				url		: _global.location.http() + '/mobile/eis/dailystock/get/search.do',
				url		: 'http://localhost:8088/socket/live',
				params	: {
					token : _global.token_id,
					param : JSON.stringify(
						{	bar_code : '0002',
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					console.log(response);
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						console.log(result);
					}
				},
				failure : function(result, request) {
					mask.hide();
					Ext.Msg.error(result.mesage);
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},


	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-testusermast-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title		: 'Gantt',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister13',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Column',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister',
									flex	: 1,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-testusermast-lister2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Pie',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister3',
									flex	: 1,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-testusermast-lister3_2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Donut',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister4',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Bubble',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister5',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'TimeLine',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister6',
									flex	: 1,
									region	: 'north',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-testusermast-lister6_2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Gauge',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister7',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'CandleStick',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister8',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Area',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister9',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Geo',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister10',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Line',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister11',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: 'Intervals',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-testusermast-lister12',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},
					]
				}
			]
		}
	return card;
	}
});


