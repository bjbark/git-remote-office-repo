Ext.define('module.custom.komec.item.bommast.view.BomMastCopyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-komec-bommast-copy-popup',

	title		: '배합표 복사',
	closable	: true,
	autoShow	: true,
	width		: 430 ,
	height		: 400,
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
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 400,
				fieldDefaults	: { width : 180, labelWidth : 60, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('item_name','품명'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'item_name',
										pair		: 'item_idcd',
										clearable	: true,
										width		: 360,
										allowBlank	: false ,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup-sjung',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : me.popup.param.acct_bacd, revs_dvcd : me.popup.param.revs_dvcd},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_idcd'));

												me.down('[name=revs_numb]').setValue(records[0].get('revs_numb'));
											}
										}
									},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('revs_numb', '리비전No' ),
										xtype		: 'textfield',
										name		: 'revs_numb',
										allowBlank	: false ,
										emptyText	: Const.invalid.emptyValue,
										fieldCls	: 'requiredindex',
									},{	fieldLabel	: Language.get('test_date','실험일자'),
										xtype		: 'datefield',
										name		: 'test_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: new Date()
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('drtr_name','담당자'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'drtr_name',
										pair		: 'drtr_idcd',
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-user-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('user_name'));
												pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('adpt_date','적용일자'),
										xtype		: 'datefield',
										name		: 'adpt_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: new Date()
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('befr_splr_name','전공급사'),
										xtype		: 'textfield',
										name		: 'befr_splr_name',
										width		: 360,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('splr_name','변경공급사'),
										xtype		: 'textfield',
										name		: 'splr_name',
										width		: 360,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('usag_qntt_memo','사용량'),
										xtype		: 'textfield',
										name		: 'usag_qntt_memo',
										width		: 360,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('ecod_purp', '목적' ),
										xtype		: 'textarea',
										name		: 'ecod_purp',
										width		: 360,
									},{ name : 'prnt_item_idcd', xtype:'textfield', hidden: true, value:me.popup.param.item_idcd
									}
								]
							},{	xtype	: 'textfield',
								name	: 'revs_dvcd',
								value	: me.popup.param.revs_dvcd,
								hidden	: true
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('remk_text', '비고' ),
										xtype		: 'textfield',
										name		: 'remk_text',
										width		: 360,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,
								items : [
									{	fieldLabel	: Language.get('prnt_name','상위품목'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'prnt_name',
										pair		: 'prnt_idcd',
										clearable	: true,
										width		: 360,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup-v4',
											params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : 'ECO품목' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_idcd'));
											}
										}
									},{	name : 'prnt_idcd', xtype : 'textfield' , hidden : true
									}
								]
							}
						]
					}
				]
			};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-sjflv-bommast-lister2')[0],
			lister	= Ext.ComponentQuery.query('module-sjflv-bommast-lister3')[0],
			record
		;
		if(!values.item_idcd){
			Ext.Msg.alert("알림","품목을 선택해주십시오.");
		}else if(!values.revs_numb){
			Ext.Msg.alert("알림","리비젼No를 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			Ext.Ajax.request({
				url			: _global.location.http() + '/custom/sjflv/item/bommast/set/copyBom.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						records		: [values],
						crte_idcd	: _global.login_pk
					})
				},
				async : false,
				success : function(response, request) {
					master.getStore().reload();
					lister.getStore().clearData();
					lister.getStore().removeAll();
					me.setResponse( {success : true});
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				},
				finished : function(results, record, operation){
				}
			});
			mask.hide();
		}
	}
});
