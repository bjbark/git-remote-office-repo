Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.AsmtCodePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcordr2-asmtcode-popup',

	title		: '부자재코드 추가',
	closable	: true,
	autoShow	: true,
	width		: 380 ,
	height		: 330,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

		resource.keygen({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			object	: resource. keygen,
			params	: {
				token	: _global. token_id ,
				param	: JSON. stringify({
					stor_id	: _global.stor_id,
					table_nm: 'asmt_mast'
				})
			 },
			async  : false,
			callback : function(keygen) {
				if (keygen.success) {
					me.down('[name=asmt_idcd]').setValue(keygen.records[0].seq);
				} else {
					Ext.Msg.alert("error", keygen.message  );
					return;
				}
			}
		});

		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/max.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				me.down('[name=asmt_code]').setValue(result.records[0].code);
			}
		});

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
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.updateAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me = this,
		item = {
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 400,
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('asmt_code','부자재코드'),
							name		: 'asmt_code',
							xtype		: 'textfield',
							readOnly	: true,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 340
						}
					]
				},{	fieldLabel	: Language.get('asmt_name','부자재명'),
					xtype		: 'textfield',
					name		: 'asmt_name',
					width		: 340
				},{	fieldLabel	: Language.get('asmt_spec','규격'),
					xtype		: 'textfield',
					name		: 'asmt_spec',
					width		: 340
				},{	fieldLabel	: Language.get('asmt_dvcd','자재구분'),
					xtype		: 'lookupfield',
					name		: 'asmt_dvcd',
					width		: 340,
					editable	: false,
					lookupValue	: resource.lookup('asmt_dvcd')
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('unit_idcd','단위'),
							xtype		: 'popupfield',
							name		: 'unit_name',
							pair		: 'unit_idcd',
							width		: 170,
							popup		: {
								select : 'SINGLE',
								widget : 'lookup-unit-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('unit_name'));
									pairField.setValue(records[0].get('unit_idcd'));
									}
								}
						},{	fieldLabel	: Language.get('stnd_pric','표준단가'),
								xtype		: 'numericfield',
								name		: 'stnd_pric',
								width		: 140,
								labelWidth	: 45,
								minValue	: 0,
								margin		: '0 0 0 30',
						}
						]
					},{	xtype		: 'textfield',
						name		: 'unit_idcd',
						hidden		: true,
					},{	fieldLabel	: Language.get('sale_cstm_idcd','매출거래처'),
						xtype		: 'popupfield',
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						width		: 340,
						popup: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup',
							params	: { stor_grp : _global.stor_grp , sale_cstm_yorn : '1', line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							}
						}
					},{	xtype		: 'textfield',
						name		: 'cstm_idcd',
						hidden		: true,
					},{	xtype		: 'textfield',
						name		: 'sale_cstm_idcd',
						hidden		: true,
					},{	fieldLabel	: Language.get('prod_idcd','제품코드'),
						xtype		: 'popupfield',
						name		: 'item_name',
						pair		: 'asmt_idcd',
						width		: 340,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-prod-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('prod_name'));
								pairField.setValue(records[0].get('prod_idcd'));
							}
						}
				},{	xtype		: 'textfield',
					name		: 'prod_idcd',
					hidden		: true,
				},{	fieldLabel	: Language.get('','사용처'),
					xtype		: 'popupfield',
					name		: 'cstm_name2',
					pair		: 'used_cstm_idcd',
					width		: 340,
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-cstm-popup',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));
						}
					}
				},{	fieldLabel	: Language.get('mngt_numb','관리번호'),
					xtype		: 'textfield',
					name		: 'mngt_numb',
					width		: 340,
				},{	xtype : 'textfield',	name : 'used_cstm_idcd'	, hidden : true,
				},{	xtype : 'textfield',	name : 'asmt_idcd'	, hidden : true,
				},{	xtype : 'textfield',	name : 'change'		, hidden : true,
				},{	xtype : 'textfield',	name : 'modify'		, hidden : true,
				}
			]
		}
	;
	return item;
	},


	updateAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			store	= Ext.ComponentQuery.query('module-purcordr2-worker-lister')[0].getStore()
		;

		if(values.asmt_name == ''){
			Ext.Msg.alert("알림","부자재명을 입력해주십시오.");
			return;
		}
		if(values.asmt_dvcd == ''){
			Ext.Msg.alert("알림","자재구분을 선택해주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/item/asmtmast/set/simple.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					asmt_idcd		: values.asmt_idcd,
					asmt_code		: values.asmt_code,
					asmt_name		: values.asmt_name,
					asmt_dvcd		: values.asmt_dvcd,
					asmt_spec		: values.asmt_spec,
					unit_idcd		: values.unit_idcd,
					stnd_pric		: values.stnd_pric,
					cstm_idcd		: values.cstm_idcd,
					item_idcd		: values.item_idcd,
					mngt_numb		: values.mngt_numb,
					asmt_usge		: values.asmt_usge,
					line_stat		: values.line_stat,
					used_cstm_idcd	: values.used_cstm_idcd,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
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
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});

		record = Ext.create( store.model.modelName , {
			asmt_idcd		: values.asmt_idcd,
			asmt_code		: values.asmt_code,
			asmt_name		: values.asmt_name,
			asmt_dvcd		: values.asmt_dvcd,
			asmt_spec		: values.asmt_spec,
			unit_idcd		: values.unit_idcd,
			unit_name		: values.unit_name,
			offr_pric		: values.stnd_pric,
			cstm_idcd		: values.cstm_idcd,
			item_idcd		: values.item_idcd,
			mngt_numb		: values.mngt_numb,
			asmt_usge		: values.asmt_usge,
			line_stat		: values.line_stat,
			used_cstm_idcd	: values.used_cstm_idcd,
			stor_id			: _global.stor_id,
			hqof_idcd		: _global.hqof_idcd,
			offr_path_dvcd	: 2,
			change			: 'Y'
		});
		store.add(record);
		record.commit();

	}
});
