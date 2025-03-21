Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-estimast-worker-editor',
//	height	: 210,
//	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastInvoice' );
	},
//	height : 500,
	layout : {
		type: 'border'
	},

	title			: Language.get('esti_idcd','견적 정보'),
	collapsible 	: true,
	collapsed		: true,
//	defaultFocus	: 'esti_idcd',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				width			: 300,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 -30',
						items	: [
							{	fieldLabel	: Language.get('acpt_numb','견적번호'),
								xtype		: 'textfield',
								name		: 'invc_numb',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							}
						]
					},{	fieldLabel	: Language.get('esti_date','견적일자'),
						xtype		: 'datefield',
						name		: 'invc_date',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						labelWidth	: 70,
						width		: 250
					},{	name : 'post_code' , width : 210 , xtype  : 'textfield' ,  margin : '0 0 2 10' ,hidden: true
					},{	name : 'addr_1fst' , width : 210 , xtype  : 'textfield' ,  margin : '0 0 2 10' ,hidden: true
					},{	name : 'addr_2snd' , width : 210 , xtype  : 'textfield' ,  margin : '0 0 2 10' ,hidden: true
					},{	fieldLabel	: Language.get('cstm_code','거래처코드'),
						xtype		: 'popupfield',
						name		: 'cstm_idcd',
						pair		: 'cstm_name',
						margin 		: '0 0 5 -30',
						width		: 280,
						editable	: true,
						enableKeyEvents : true,
						clearable	: true ,
						popup		: {
							widget	: 'lookup-cstm-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
							result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_idcd'));
									pairField.setValue(records[0].get('cstm_name'));
									var search = Ext.ComponentQuery.query('module-estimast-search')[0];
									var item_popup = search.down('[name=item_code]');
							}
						}
					},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
						name		: 'cstm_name',
						xtype		: 'textfield',
						allowBlank	: false,
						clearable	: false ,
						width		: 280,
						margin 		: '0 0 5 -30',
					},{	name : 'cstm_code', xtype	: 'textfield', hidden : true
					},{	fieldLabel	: Language.get('crny_dvcd','화폐단위'),
						xtype		: 'lookupfield',
						name		: 'crny_dvcd',
						margin 		: '0 0 5 -30',
						width		: 280,
						lookupValue	: resource.lookup('crny_dvcd'),
						enableKeyEvents : true,
					},{	fieldLabel	: Language.get('expt_dvcd','단가조건'),
						xtype		: 'lookupfield',
						name		: 'expt_dvcd',
						margin 		: '0 0 5 -30',
						width		: 280,
						lookupValue	: resource.lookup('pric_cond_dvcd'),
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
									me.down('[name=trde_stot_dvcd]').focus(true , 10)
								}
								this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
									scope: this,
									key: Ext.EventObject.TAB,
									shift:true,
									fn: function () {
										me.down('[name=drtr_name]').focus(true , 10)
									}
								});
							}
						}
					},{	fieldLabel	: Language.get('dlvy_cond','결제방법'),
						xtype		: 'lookupfield',
						name		: 'dlvy_cond',
						width		: 280,
						margin 		: '0 0 5 -30',
						lookupValue	: resource.lookup('trde_stot_dvcd'),
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
									me.down('[name=stot_time_dvcd]').focus(true , 10)
								}
								this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
									scope: this,
									key: Ext.EventObject.TAB,
									shift:true,
									fn: function () {
										me.down('[name=pric_cond_dvcd]').focus(true , 10)
									}
								});
							}
						}
					},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
					},{	fieldLabel	: Language.get('esti_vald_term','결제유효기간'),
						xtype		: 'textfield',
						name		: 'esti_vald_term',
						width		: 280,
						margin 		: '0 0 5 -30',
					},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
					}

				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1	: function() {
		var me	= this,
		item	= {
				title		: Language.get('memo','비고'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 170,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea'  ,
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});