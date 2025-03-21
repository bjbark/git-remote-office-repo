Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-iypkg-saleostt-add-popup',

	title		: '출고등록',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 160,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							fieldDefaults: { width : 160, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	layout :'hbox',
									border : 0,
									items  : [
										{	fieldLabel	: Language.get('prod_name','제품코드'),
											xtype		: 'popupfield',
											name		: 'prod_code',
											margin		: '5 5 0 5',
											pair		: 'prod_idcd',
											width		: 160,
											editable	: true,
											enableKeyEvents : true,
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-prod-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('prod_code'));
													pairField.setValue(records[0].get('prod_idcd'));
													me.down('[name=prod_name]').setValue(records[0].get('prod_name'));
													me.down('[name=prod_spec]').setValue(records[0].get('prod_spec'));
													me.down('[name=prod_leng]').setValue(records[0].get('prod_leng'));
													me.down('[name=prod_widh]').setValue(records[0].get('prod_widh'));
													me.down('[name=prod_hght]').setValue(records[0].get('prod_hght'));
													me.down('[name=pqty_pric]').setValue(records[0].get('pqty_pric'));
												}
											}
										},{	name : 'prod_name', xtype : 'textfield',margin		: '6 5 0 5',
										},{	name : 'prod_leng', xtype : 'textfield' , hidden : true
										},{	name : 'prod_widh', xtype : 'textfield' , hidden : true
										},{	name : 'prod_hght', xtype : 'textfield' , hidden : true
										},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	fieldLabel	: Language.get('prod_spec','규격'),
									xtype		: 'textfield',
									name 		: 'prod_spec',
									width		: 330,
									margin		: '6 5 0 5',
									readOnly	: true
								},{	layout :'hbox',
									border : 0,
									items  : [
										{	fieldLabel	: Language.get('','수량'),
											name		: 'acpt_qntt',
											xtype		: 'numericfield',
											margin		: '6 5 0 5'
										},{	fieldLabel	: Language.get('pqty_pric','단가'),
											name		: 'pqty_pric',
											xtype		: 'numericfield',
											margin		: '6 5 0 5'
										}
									],
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			lister = Ext.ComponentQuery.query('module-saleostt-worker-lister')[0],
			new_invc_numb,sale_amnt,vatx_amnt
		;
		if(!values.prod_idcd){
			Ext.Msg.alert('알림','제품을 선택해주세요.');
			return;
		}
		if(!values.acpt_qntt){
			Ext.Msg.alert('알림','수량을 입력해주세요.');
			return;
		}
		sale_amnt = values.acpt_qntt * values.pqty_pric;
		vatx_amnt = Math.floor(sale_amnt*Number(_global.tax_rt)/1000)*10

		Ext.merge(values,{
			plan_qntt : values.acpt_qntt,
			unpaid    : values.acpt_qntt,
			orig_seqn : 0
		});
		var record = Ext.create( lister.getStore().model.modelName , values);
		lister.getStore().add(record);
//		lister.getStore().commitChanges();

		var	idx = lister.getStore().indexOf(record),
			at = lister.getStore().getAt(idx)
		;

		at.set('ostt_qntt2',values.acpt_qntt);
		at.set('sale_amnt',sale_amnt);
		at.set('vatx_amnt',vatx_amnt);
		at.set('ttsm_amnt',values.acpt_qntt);
		at.set('chk',true);

		me.close();
	}
});
