Ext.define('lookup.popup.view.ItemCodeAddPopupAone', { extend: 'Axt.popup.Search',
	alias: 'widget.module-itemcode-add-popup-aone',

	//	혁진전용
	title		: '품목 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 360 ,
	height		: 240 ,
	layout		: {
		type : 'border'
	},
	requires: [
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ItemClassPopup4',
	],

	defaultFocus : 'item_name',

	initComponent: function(config){
		var me = this;
		var code = '';
		var acct = new Array, acct_name = '';

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'item_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				code = result.records[0].seq;
			}
		});

		if(me.params.acct != null){
			var bacd      = me.params.acct,
				acct_name = me.params.acct_name
			;
//			bacd.substr(0,1)=='2'?me.setHeight(180):me.setHeight(260);
			acct[0]= bacd;
			if(me.popup.params.acct_name){
				acct[1] = me.popup.params.acct_name
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/basic/basemast/get/lookup.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id   : _global.stor_id,
							hqof_idcd : _global.hqof_idcd,
							prnt_idcd : '1102',
							base_code : bacd,
							line_stat : 0
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						acct[1] = result.records[0].base_name;
					}
				});
			}
		}
		me.items = [ me.createForm(code, acct)];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function(code, acct) {
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
			items : [me.editorForm(code, acct) ]
		};
		return form;
	},

	editorForm : function (code, acct) {
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
						{	name : 'item_code', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_code', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_code', xtype : 'textfield' , hidden : true
						},{	name : 'scls_code', xtype : 'textfield' , hidden : true
						},{	name : 'lcls_name', xtype : 'textfield' , hidden : true
						},{	name : 'mcls_name', xtype : 'textfield' , hidden : true
						},{	name : 'scls_name', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('_name','계정구분'),
							xtype		: 'popupfield',
							itemID		: 'acct_bacd_name',
							name		: 'acct_bacd_name',
							pair		: 'acct_bacd',
							width		: 185,
							editable	: false,
							clearable	: true,
							allowBlank	: false,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							listeners	: {
										change : function(self, value){
//											if(value == "부품"){
//												me.down('[name=prts_type_name]').show();
//												me.down('[name=mker_name]').show();
//											}else{
//												me.down('[name=prts_type_name]').hide();
//												me.down('[name=mker_name]').hide();
//											}
										}
									},
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									},
								},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
								},{	fieldLabel	: Language.get('clss_desc','품목분류'),
									xtype		: 'popupfield',
									name		: 'clss_desc',
									pair		: 'lcls_idcd',
									width		: 340,
									fieldCls	: 'requiredindex',
									editable	: false,
									clearable	: true,
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
									enableKeyEvents : true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-item-clss-popup4',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
											me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
											me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
											me.down('[name=lcls_code]').setValue(records[0].get('lcls_code'));
											me.down('[name=mcls_code]').setValue(records[0].get('mcls_code'));
											me.down('[name=scls_code]').setValue(records[0].get('scls_code'));
											me.down('[name=lcls_name]').setValue(records[0].get('lcls_name'));
											me.down('[name=mcls_name]').setValue(records[0].get('mcls_name'));
											me.down('[name=scls_name]').setValue(records[0].get('scls_name'));
											me.down('[name=item_name]').setValue(records[0].get('mcls_name'));
											me.down('[name=item_spec]').setValue(records[0].get('scls_name'));
											me.down('[name=item_code_prefix]').setValue(records[0].get('lcls_code')+records[0].get('mcls_code')+records[0].get('scls_code'));
											nameField.setValue(records[0].get('clss_desc'));
										},
									},
									listeners	: {
										change : function(self, value, value2){
											var panel = this.up('form'),
												item_code = panel.down('[name=item_code]').getValue(),
												item_code_prefix = panel.down('[name=item_code_prefix]').getValue(),
												item_code_subfix = '',
												item_name = ''
											;

											if(value == ''){
												var panel = this.up('form');
												panel.down('[name=item_name]').setValue(null);
												panel.down('[name=item_spec]').setValue(null);
												panel.down('[name=clss_desc]').setValue(null);
												panel.down('[name=item_code_prefix]').setValue(null);
												panel.down('[name=item_code_subfix]').setValue(null);
											}

											if(value != '' && item_code_prefix != '' && item_code == ''){
												Ext.Ajax.request({
													url    : _global.location.href + '/system/custom/aone/item/itemmast/get/maxCodeInfo.do',
													params : {
														token : _global.token_id,
														param : JSON.stringify({
															item_code : item_code_prefix
														})
													},
													method : 'POST',
													success:function(response, records){
														var result = Ext.decode(response.responseText);
														if (result.success) {
															item_code_subfix = panel.down('[name=item_code_subfix]').setValue(result.records.seqn);
															panel.down('[name=item_code]').setValue(item_code_prefix+result.records.seqn);
														}
													},
													failure:function(result, request){
													}
												});
											}
										}
									},
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
									items	: [
										{	name : 'item_idcd', xtype : 'textfield' , hidden : true,
										},{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code_prefix',
											xtype		: 'textfield',
											allowBlank	: false,
											readOnly	: true,
											value		: '',
											fieldCls	: 'requiredindex',
											width		: 250
										},{	name		: 'item_code_subfix',
											xtype		: 'textfield',
											allowBlank	: false,
											readOnly	: true,
											value		: '',
											fieldCls	: 'requiredindex',
											margin		: '1 0 0 10',
											width		: 80
										}
									]
								},{	fieldLabel	: Language.get('item_name','품명'),
									xtype		: 'textfield',
									name		: 'item_name',
									value		: '',
									width		: 340,
									margin		: '0 0 5 0',
									allowBlank	: false,
									emptyText	: Const.invalid.emptyValue,
									fieldCls	: 'requiredindex'
								},{	fieldLabel	: Language.get('item_spec','규격'),
									xtype		: 'textfield',
									name		: 'item_spec',
									width		: 340,
									margin		: '0 0 5 0',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								},{	fieldLabel	: Language.get('prts_type_name','TYPE'),
									xtype		: 'textfield',
									name		: 'prts_type_name',
									itemId		: 'prts_type_name',
									width		: 340,
									margin		: '0 0 5 0',
									enableKeyEvents : true,
									hidden		: true
								},{	fieldLabel	: Language.get('mker_name','MAKER'),
									xtype		: 'textfield',
									name		: 'mker_name',
									itemId		: 'mker_name',
									clearable	: true ,
									width		: 340,
									enableKeyEvents : true,
									hidden		: true
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
			code	= ""
		;
		if(_global.options.mes_system_type !='Frame'){
			if(values.acct_bacd_name==''||values.acct_bacd_name==null){
				Ext.Msg.alert("알림","계정구분을 반드시 선택해주십시오.");
				return;
			};
		}
		if(values.clss_desc==''||values.clss_desc==null){
			Ext.Msg.alert("알림","품목분류을 반드시 선택해주십시오.");
			return;
		};

		if(values.item_name==''||values.item_name==null){
			Ext.Msg.alert("알림","품명을 반드시 입력해주십시오.");
			return;
		};

		if(values.item_spec==''||values.item_spec==null){
			Ext.Msg.alert("알림","규격을 반드시 입력해주십시오.");
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
			url		: _global.location.http() + '/item/itemmast/set/add2.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_idcd		: invc,
					item_code		: code,
					item_name		: values.item_name,
					item_spec		: values.item_spec,
					item_tick		: values.item_tick,
					item_leng		: values.item_leng,
					lcls_idcd		: values.lcls_idcd,
					mcls_idcd		: values.mcls_idcd,
					scls_idcd		: values.scls_idcd,
					lcls_code		: values.lcls_code,
					mcls_code		: values.mcls_code,
					scls_code		: values.scls_code,
					lcls_name		: values.lcls_name,
					mcls_name		: values.mcls_name,
					mcls_name		: values.mcls_name,
					scls_code		: values.scls_code,
					item_widh		: values.item_widh,
					item_leng2		: values.item_leng2,
					item_widh2		: values.item_widh2,
					unit_wigt		: values.unit_wigt,
					spgr_valu2		: values.spgr_valu2,
					mtrl_bacd		: values.mtrl_bacd,
					mtrl_bacd_name	: values.mtrl_bacd_name,
					unit_idcd		: values.unit_idcd,
					acct_bacd		: values.acct_bacd,
					acct_bacd_name	: values.acct_bacd_name,
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
	},

//	calcul:function(acct_bacd){
//		var popup = Ext.ComponentQuery.query('module-itemcode-add-popup-aone')[0];
//		var item_leng, item_widh, item_tick;
//		var str = '';
//
//		popup.down('[name=unit_wigt]').setValue(0);
//
//		if(acct_bacd == '1001'){
//			item_leng = popup.down('[name=item_leng]').getValue();
//			item_widh = popup.down('[name=item_widh]').getValue();
//			item_tick = popup.down('[name=item_tick]').getValue();
//			spgr_valu2 = popup.down('[name=spgr_valu2]').getValue();
//
//			if(spgr_valu2 > 0 && item_leng > 0 && item_widh > 0 && item_tick > 0 ){
//
//				item_leng = popup.down('[name=item_leng]').getValue();
//				item_widh = popup.down('[name=item_widh]').getValue();
//				item_tick = popup.down('[name=item_tick]').getValue();
//				spgr_valu2 = popup.down('[name=spgr_valu2]').getValue();
//
//				if(item_leng > 0 && item_widh > 0 && item_tick > 0 && spgr_valu2 > 0){
//					wight = (item_leng * item_widh * item_tick * spgr_valu2)/1000000;
//					popup.down('[name=unit_wigt]').setValue(0);
//					popup.down('[name=unit_wigt]').setValue(wight);
//				}
//			}
//
//			if(item_tick > 0){
//				if(item_tick != 'Infinity'){
//					if(String(item_tick).indexOf('.') == -1){
//						str = item_tick+'.0T';
//					}else{
//						str = item_tick+'T';
//					}
//				}
//			}else{
//				str = '0.0T';
//			}
//			if(item_leng > 0){
//				str = str +' '+ item_leng;
//			}else{
//				str = str +' 0';
//			}
//			if(item_widh > 0){
//				str = str +'x'+ item_widh;
//			}else{
//				str = str +'x0';
//			}
//
//			popup.down('[name=item_spec]').setValue('');
//			popup.down('[name=item_spec]').setValue(str);
//		}else {
//			item_leng = Number(popup.down('[name=item_leng2]').getValue());
//			item_widh = Number(popup.down('[name=item_widh2]').getValue());
//
//			str = String(item_leng)+'*'+String(item_widh);
//
//			popup.down('[name=item_spec]').setValue('');
//			popup.down('[name=item_spec]').setValue(str);
//		}
//	},

});
