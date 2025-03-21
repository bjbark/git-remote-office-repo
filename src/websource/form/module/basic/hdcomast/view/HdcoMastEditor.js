Ext.define('module.basic.hdcomast.view.HdcoMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-hdcomast-editor',

	height : 235,
	layout : {
		type: 'border'
	},

	title			: Language.get('wrhs_idcd','택배사코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'hdco_idcd',

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
				width			: 740,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','코드'),
								xtype		: 'textfield',
								//xtype		: 'lookupfield',
								name		: 'hdco_dvcd',
//								lookupValue	: resource.lookup('hdco_dvcd'),
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 255
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							},{	fieldLabel	: '주소',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'post_code',
								pair		: '',
								allowBlank	: true,
								clearable	: false ,
								width		: 180,
								popup		: {
									select	: 'DAUM',
									widget	: 'popup-zipcode-search',
									params	: { },
									result	: function(records, nameField, pairField){
										var panel   = nameField.up('form');
										if( records.length > 0 ){
											var address = records[0];
												nameField.setValue( address.zonecode );
												panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
												panel.down('[name=addr_2snd]').focus(true , 10);
										}
									}
								}
							},{	name : 'addr_1fst' , width : 210 , xtype  : 'textfield' ,  margin : '0 0 2 10'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('hdco_name','본사명'),
								xtype		: 'textfield',
								name		: 'hdco_name',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
							},{	fieldLabel : '상세주소', xtype: 'textfield', name: 'addr_2snd',  width : 400, readOnly : false 	, maxLength   : 100, 	maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
							}
						]
					},{	fieldLabel	: Language.get('brch_name','지점명'),
						xtype		: 'textfield',
						name		: 'brch_name'
					},{	fieldLabel	: Language.get('boss_name','대표자명'),
						xtype		: 'textfield',
						name		: 'boss_name',
					},{	fieldLabel	: Language.get('tele_numb','전화번호'),
						xtype		: 'textfield',
						name		: 'tele_numb',
						width		: 220
					},{	fieldLabel	: Language.get('hdph_numb','휴대폰번호'),
						xtype		: 'textfield',
						name		: 'hdph_numb',
						width		: 220
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
				title		: Language.get('user_memo','비고'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' 		,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 140,
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