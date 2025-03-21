Ext.define('module.custom.iypkg.item.productmast.view.ProductMastCalcPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-iypkg-productmast-calc-popup',
	alias	: 'widget.module-iypkg-productmast-calc-popup',
	store	: 'module.custom.iypkg.item.productmast.store.ProductMastCalcPopup',

	title	: Language.get('','계산'),
	closable: true,
	autoShow: true,
	width	: 400,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;

		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create(me.store),
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '확인', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : '닫기', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	dataIndex: 'length'			, text : Language.get(''	,'원단'		) , width : 80, xtype:'numericcolumn',
					},{	dataIndex: 'divs'			, text : Language.get(''	,'절수'		) , width : 50, align : 'center'
					},{	dataIndex: 'deff'			, text : Language.get(''	,'재단여분'	) , width : 70, xtype:'numericcolumn',
					},{	dataIndex: 'result'			, text : Language.get(''	,'스코어'	) , width : 110 , align : 'center'
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					render: function(){
						var me		= this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
						});
					}
				}
			}
		;
		return grid;
	},


	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			records	= me.popup.params
		;
		store.load({
			params		:
				{	param:JSON.stringify({
						hq_id		: _global.hq_id,
						bxty_idcd	: records.bxty_idcd,
						fabc_idcd	: records.fabc_idcd,
						prod_hght	: records.prod_hght,
						prod_leng	: records.prod_leng,
						prod_widh	: records.prod_widh,
						sgam_relx	: records.sgam_relx
					})
				},
			scope		: me,
			callback	: function(records, operation, success) {
				 if(records){
					if(_global.hqof_idcd.toUpperCase()== 'N1000DAE-A' ){
						me.down('grid').getSelectionModel().select(0);
					}
				}
			}
		});
	},

	finishAction: function(){
		var me			= this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection()[0],
			request	= []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			me.setResponse(selects);
		}
	},
});
