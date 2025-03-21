Ext.define('module.item.colormix.view.ColorMixEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-colormix-editor',

	height : 345,
	layout : {
		type: 'border'
	},

	title			: Language.get('prnt_item_idcd','안료 및 첨가내역'),
	collapsible		: true	,
	collapsed		: true	,
	defaultFocus	: 'prnt_item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	fieldLabel	: Language.get('item','품목'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'prnt_item_name',
						width		: 380,
						margin		: '5 0 0 10',
						pair		: 'prnt_item_idcd',
						fieldCls	: 'requiredindex',
						clearable	: false,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						},
					},{	name : 'prnt_item_idcd', xtype : 'textfield' , hidden : true,
						listeners	:{
							change:function(){
								var prnt_item_idcd = this.getValue(),
									old_line_seqn = 0
								;
								Ext.Ajax.request({
									url		: _global.location.http() + '/item/colormix/get/seqn.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											prnt_item_idcd : prnt_item_idcd
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);

										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											old_line_seqn = result.records[0].line_seqn;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								old_line_seqn = old_line_seqn+1;
								me.down('[name=chge_degr]').setValue(old_line_seqn);
							}
						}
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('chge_degr','차수'),
								name		: 'chge_degr',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								width		: 200,
								margin		: '5 0 5 10',
								readOnly	: true
							},{	fieldLabel	: Language.get('dwup_date','작성일자'),
								name		: 'dwup_date',
								xtype		: 'datefield',
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								width		: 180,
								margin		: '5 0 5 0',
								readOnly	: false
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('colr_name','컬러명'),
								name		: 'colr_name',
								xtype		: 'textfield',
								width		: 380,
								margin		: '0 0 0 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('bsmt_name','원료명'),
								name		: 'item_name',
								xtype		: 'textfield',
								width		: 380,
								margin		: '0 0 0 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('unit_perc_wigt','단위당 중량'),
								name		: 'unit_perc_wigt',
								xtype		: 'numericfield',
								width		: 200,
								margin		: '0 0 5 10',
							},{	fieldLabel	: Language.get('wigt_unit','단위'),
								xtype		: 'textfield',
								name		: 'wigt_unit',
								width		: 180
							},{fieldLabel	: Language.get( 'change','change'),
								xtype		: 'textfield',
								name		: 'change',
								hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('need_time','소요시간'),
								name		: 'need_time',
								xtype		: 'numericfield',
								width		: 200,
								margin		: '0 0 5 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('user_memo','비고사항'),
								name		: 'user_memo',
								xtype		: 'textarea',
								width		: 380,
								height		: 70,
								margin		: '0 0 5 10'
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1()]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '품목별 안료 및 첨가내역'),
			xtype	: 'module-colormix-item-lister',
		};
		return item;
	},
});