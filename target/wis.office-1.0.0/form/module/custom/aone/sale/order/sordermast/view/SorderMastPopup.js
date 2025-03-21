Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-aone-sordermast-popup',

	title	: Language.get('add_Popup','추가등록'),
	closable: true,
	autoShow: true,
	width	: 815,
	height	: 600,
	layout	: {
		type: 'border'
	},

	initComponent: function(config){
		var me = this;
			me.items = [me.createForm()];
			me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-layout',
			region		: 'center',
			border		: false,
			items		: [me.createTabs()]
			};
		return form;
	},
	createTabs : function () {
		var me = this;
		grid = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				dockedItems : [ me.createTab4()],
				plain	: true,
				flex  	: 1,
				items	: [
					{	title 	: '작업내역'	,
						xtype	: 'module-aone-sordermast-popup-mans' ,
						itemId		: 'sorderMastAddGrid',
						name		: 'sorderMastAddGrid',
					},me.createTab2(),
				]
			}
		;
		return grid;
	},

	createTab2 : function() {
		var me = this,
			item = {
				title	: '자재사용내역',
				xtype: 'module-aone-sordermast-popup-mtrl',
				itemId		: 'sorderMastAddGrid2',
				name		: 'sorderMastAddGrid2',
				}
			;
		return item;
	},

	

	createTab4 : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.updateAction,cls: 'button-style'},
				{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
				]
			}
		;
		return item;
	},

	/**
	 * 저장 버튼 이벤트
	 */
	updateAction: function( records ){
		var me     = this,
			store  = me.down('#sorderMastAddGrid').getStore(),
			store2 = me.down('#sorderMastAddGrid2').getStore(),
			owner  = me.popup.params.owner,
			need_time=0,mtrl_pric=0
		;
		
		store.each(function(rec){
			need_time += Number(rec.get('need_time'));
		});
		store2.each(function(rec){
			mtrl_pric += Number(rec.get('amnt'));
		})
		store2.sync({
			callback:function(){
				owner.down('[name=prts_repa_amnt]').setValue(mtrl_pric);
			}
		});
		store.sync({
			callback:function(){
				owner.down('[name=need_time]').setValue(need_time);
			}
		});
		me.close();
	},
});
