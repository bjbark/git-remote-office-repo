Ext.define('lookup.popup.view.ItemCodeAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-itemcode-add-popup',

	title		: '품목 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 300 ,
	height		: 290 ,
	layout		: {
		type : 'border'
	},
	requires: [
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
	],

	defaultFocus : 'item_code',

	initComponent: function(config){
		var me = this;
		var chk = false;
		me.items = [ me.createForm(chk)];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function(chk) {
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
			items : [me.editorForm(chk) ]
		};
		return form;
	},

	editorForm : function (chk) {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height		: 400 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 70, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('item_code','품목코드'),
									name		: 'item_code',
									xtype		: 'textfield',
									itemId		: 'item_code',
									width		: 250,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								},{ fieldLabel	: Language.get('item_name','품명'),
									xtype		: 'textfield',
									name		: 'item_name',
									itemId		: 'item_name',
									width		: 250,
									value		: me.params.item_name,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
												var panel = self.up('form');
												panel.down('[name=acct_bacd]').focus(true, 10);
											}
										}
									}
								},{	fieldLabel	: Language.get('acct_bacd','계정구분'),
									name		: 'acct_bacd',
									xtype		: 'lookupfield',
									width		: 145,
									value		: me.params.acct_bacd,
									lookupValue: [["원재료", "원재료"],["부자재", "부자재"]],
								},{ fieldLabel	: Language.get('item_spec','규격'),
									xtype		: 'textfield',
									name		: 'item_spec',
									itemId		: 'item_spec',
									width		: 250,
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || (e.keyCode == e.TAB && e.shiftKey==false)) {
												var panel = self.up('form');
												panel.down('[name=mtrl_bacd_name]').focus(true, 10);
											}
										},
									}
								},{	fieldLabel	: Language.get('unit_name','단위'),
									width		: 250,
									xtype		: 'popupfield',
									editable	: false,
									enableKeyEvents : true,
									name		: 'unit_name',
									pair		: 'unit_idcd',
									clearable	: true ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-unit-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('unit_name'));
											pairField.setValue(records[0].get('unit_idcd'));
										}
									},
									listners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=cstm_idcd]').reset();
											}
										}
									}
								},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('clss_desc','품목분류'),
									width		: 250,
									xtype		: 'popupfield',
									editable	: false,
									enableKeyEvents : true,
									name		: 'clss_desc',
									pair		: 'lcls_idcd',
									clearable	: true ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-item-clss-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
											me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
											me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
											nameField.setValue(records[0].get('clss_desc'));
										}
									},
									listners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
												me.down('[name=lcls_idcd]').reset();
												me.down('[name=mcls_idcd]').reset();
												me.down('[name=scls_idcd]').reset();
											}
										}
									}
								},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
								},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
								},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('mtrl_bacd_name','재질'),
									width		: 250,
									xtype		: 'popupfield',
									editable	: false,
									enableKeyEvents : true,
									name		: 'mtrl_bacd_name',
									pair		: 'mtrl_bacd',
									clearable	: true ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									},
									listners	: {
										change	: function() {
											var val = this.getValue();
											if(val=='' || val == null){
//												me.down('[name=lcls_idcd]').reset();
											}
										}
									}
								},{	name : 'mtrl_bacd', xtype : 'textfield' , hidden : true
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
			item_leng	= "",
			invc	= "",
			code	= "",
			mngt_sbsc_valu = "",
			mngt_sbsc_idcd = ""
		;
		if(me.popup.params.mngt_sbsc_valu){
			mngt_sbsc_valu= me.popup.params.mngt_sbsc_valu;
		}
		if(me.popup.params.mngt_sbsc_idcd){
			mngt_sbsc_idcd = me.popup.params.mngt_sbsc_idcd;
		}
		if(_global.options.mes_system_type !='Frame'){
			if(values.item_code==''||values.item_code==null){
				Ext.Msg.alert("알림","품목 코드를 반드시  입력해주십시오.");
				return;
			};
		}
		if(values.item_name==''||values.item_name==null){
			Ext.Msg.alert("알림","품명을 반드시  입력해주십시오.");
			return;
		};

		resource.keygen({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			object	: resource. keygen,
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'item_mast'
				})
			 },
			async  : false,
			callback : function( keygen ) {
				if (keygen.success) {
					invc = keygen.records[0].seq;
					code = keygen.records[0].code;
				} else {
					Ext.Msg.alert("error", keygen.message  );
					return;
				}
			}
		});
		if(values.item_leng <= 0){

		}
		if(_global.options.mes_system_type !='Frame'){
			code = values.item_code;
		}else{
			values.item_code = code;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/item/itemmast/set/add.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_idcd	: invc,
					item_code	: code,
					item_name	: values.item_name,
					item_spec	: values.item_spec,
					item_leng	: '0',
					item_tick	: '0',
					item_widh	: '0',
					unit_wigt	: values.unit_wigt,
					spgr_valu2	: values.spgr_valu2,
					mtrl_bacd	: values.mtrl_bacd,
					unit_idcd	: values.unit_idcd,
					acct_bacd	: values.acct_bacd,
					lcls_idcd	: values.lcls_idcd,
					mcls_idcd	: values.mcls_idcd,
					scls_idcd	: values.scls_idcd,
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd,
					mngt_sbsc_valu	: mngt_sbsc_valu,
					mngt_sbsc_idcd	: mngt_sbsc_idcd,
					crte_idcd	: _global.login_pk
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
	},

	calcul:function(chk){
		var popup = Ext.ComponentQuery.query('module-itemcode-add-popup')[0];
		var item_leng = popup.down('[name=item_leng]').getValue();
		var item_widh = popup.down('[name=item_widh]').getValue();
		var item_tick = popup.down('[name=item_tick]').getValue();
		var acct_bacd = popup.down('[name=acct_bacd]').getValue();
		var str = '';
		if(acct_bacd == null || acct_bacd == ''){
			Ext.Msg.alert("알림","계정구분을 선택하여 주십시오.");
			return;
		}
		popup.down('[name=item_spec]').reset();
		if(acct_bacd == '원재료'){
			if(item_tick > 0){
				if(item_tick != 'Infinity'){
					if(String(item_tick).indexOf('.') == -1){
						str = item_tick+'.0T';
					}else{
						str = item_tick+'T';
					}
				}
			}else{
				str = '0.0T';
			}
			if(item_leng > 0){
				str = str +' '+ item_leng;
			}else{
				str = str +' 0';
			}
			if(item_widh > 0){
				str = str +'x'+ item_widh;
			}else{
				str = str +'x0';
			}

		}else{
			if(item_leng > 0){
				str = str +item_leng;
			}else{
				str = str +'0';
			}
			if(item_widh > 0){
				str = str +'x'+ item_widh;
			}else{
				str = str +'x0';
			}
		}
		popup.down('[name=item_spec]').setValue(str);
	},

	weigth:function(){
		var popup = Ext.ComponentQuery.query('module-itemcode-add-popup')[0];
		var item_leng = popup.down('[name=item_leng]').getValue();
		var item_widh = popup.down('[name=item_widh]').getValue();
		var item_tick = popup.down('[name=item_tick]').getValue();
		var spgr_valu2 = popup.down('[name=spgr_valu2]').getValue();
		var acct_bacd = popup.down('[name=acct_bacd]').getValue();
		var wight = 0;

		if(acct_bacd == null || acct_bacd == ''){
			Ext.Msg.alert("알림","계정구분을 선택하여 주십시오.");
			return;
		}

		popup.down('[name=unit_wigt]').reset();
		if(acct_bacd == '원재료'){
			if(item_leng > 0 && item_widh > 0 && item_tick > 0 && spgr_valu2 > 0){
				wight = item_leng * item_widh * item_tick * spgr_valu2;
			}
		}
		popup.down('[name=unit_wigt]').setValue(wight);
	},
});
