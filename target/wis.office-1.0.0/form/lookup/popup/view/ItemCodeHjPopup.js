Ext.define('lookup.popup.view.ItemCodeHjPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.lookup-itemcode-hj-popup',

	//	혁진전용
	title		: '품목 간편 등록',
	closable	: true,
	autoShow	: true,
	width		: 300 ,
	height		: 180 ,
	layout		: {
		type : 'border'
	},
	requires: [
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
	],

	defaultFocus : 'item_name',

	initComponent: function(config){
		var me = this;
		var code = '';
		var acct = new Array, acct_name = '';
		console.log(me.popup.params);
		if(me.popup.params.acct){
			var bacd      = me.popup.params.acct,
				acct_name = me.popup.params.acct_name
			;
			bacd.substr(0,1)=='2'?me.setHeight(210):me.setHeight(280);
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
		}else{
			Ext.Msg.alert('알림','품목 계정구분을 선택해주세요.');
			me.close;
		}
		me.items = [ me.createForm(acct)];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function(acct) {
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
			items : [me.editorForm(acct) ]
		};
		return form;
	},

	editorForm : function (acct) {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height	: 400 ,
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
									value		: (me.popup.params.dvcd=='insert'?'':me.popup.params.item_code),
									hidden		: true,
								},{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
									name		: 'acct_bacd_name',
									xtype		: 'popupfield',
									pair		: 'acct_bacd',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									width		: 250,
									readOnly	: acct[0]!=null? true:false,
									fieldCls	: acct[0]!=null? 'readonlyfield' : '',
									value		: acct[0]!=null? acct[1]:'',
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));

											setTimeout(function(){
												me.down('[name=item_name]').focus(true , 10);
											},100);
										}
									},
									listeners	: {
										change	: function (value){
											var val = this.getValue();
											if(val != '' || val != null){
											}
										}
									}
								},{	fieldLabel	: Language.get('acct_bacd','계정구분'),
									name		: 'acct_bacd',
									xtype		: 'textfield',
									width		: 250,
									value		: acct[0],
									hidden		: true,
									listeners	: {
										change	: function (value){
											var val = this.getValue();
											if(val != '' || val != null){
												me.down('[name=item_tick]').setValue(0);
												me.down('[name=item_leng]').setValue(0);
												me.down('[name=item_widh]').setValue(0);
												me.down('[name=item_leng2]').setValue(0);
												me.down('[name=item_widh2]').setValue(0);
												me.down('[name=unit_wigt]').setValue(0)
												me.down('[name=spgr_valu2]').setValue(1);
												me.down('[name=item_spec]').setValue('');
												me.down('[name=mtrl_bacd_name]').setValue('');
												me.down('[name=mtrl_bacd]').setValue('');
												me.down('[name=item_spec]').setValue('');

												if(val == '1002'){
													me.down('[name=item_tick]').hide();
													me.down('[name=item_leng]').hide();
													me.down('[name=item_widh]').hide();
													me.down('[name=item_leng2]').hide();
													me.down('[name=item_widh2]').hide();
													me.down('[name=unit_wigt]').hide();
													me.down('[name=spgr_valu2]').hide();
													me.down('[name=item_spec]').show();
													me.down('[name=item_spec]').setReadOnly(false);
													me.down('[name=mtrl_bacd_name]').hide();
												}else if (val == '1001'){
													me.down('[name=item_tick]').show();
													me.down('[name=item_leng]').show();
													me.down('[name=item_widh]').show();
													me.down('[name=unit_wigt]').show();
													me.down('[name=spgr_valu2]').show();
													me.down('[name=item_leng2]').hide();
													me.down('[name=item_widh2]').hide();
													me.down('[name=item_spec]').show();
													me.down('[name=mtrl_bacd_name]').show();
												}else if (val == '3000' || val == '2002'){
													me.down('[name=item_tick]').setValue(0);
													me.down('[name=item_tick]').show();
													me.down('[name=item_leng]').hide();
													me.down('[name=item_widh]').hide();
													me.down('[name=unit_wigt]').hide();
													me.down('[name=item_spec]').show();
													me.down('[name=mtrl_bacd_name]').hide();
													me.down('[name=spgr_valu2]').hide();
													me.down('[name=item_leng2]').show();
													me.down('[name=item_widh2]').show();
												}else if (val == '2001'){
													me.down('[name=item_tick]').setValue(0);
													me.down('[name=item_tick]').show();
													me.down('[name=item_leng]').hide();
													me.down('[name=item_widh]').hide();
													me.down('[name=unit_wigt]').hide();
													me.down('[name=item_spec]').setReadOnly(false);
													me.down('[name=item_spec]').show();
													me.down('[name=mtrl_bacd_name]').hide();
													me.down('[name=spgr_valu2]').hide();
													me.down('[name=item_leng2]').show();
													me.down('[name=item_widh2]').show();
												}else {
													me.down('[name=item_name]').show();
													me.down('[name=item_tick]').show();
													me.down('[name=item_leng]').hide();
													me.down('[name=item_widh]').hide();
													me.down('[name=unit_wigt]').hide();
													me.down('[name=item_spec]').setReadOnly(false);
													me.down('[name=item_spec]').show();
													me.down('[name=mtrl_bacd_name]').hide();
													me.down('[name=spgr_valu2]').hide();
													me.down('[name=item_leng2]').show();
													me.down('[name=item_widh2]').show();
												}
											}
										}
									}
								},{ fieldLabel	: Language.get('item_name','품명'),
									xtype		: 'textfield',
									name		: 'item_name',
									itemId		: 'item_name',
									width		: 250,
									value		: (me.popup.params.dvcd=='insert'?'':me.popup.params.item_name),									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
												var panel = self.up('form'),
													acct_bacd = me.down('[name=acct_bacd]').getValue()
												;
												if(acct_bacd == '1001'){
													panel.down('[name=item_tick]').focus(true, 10);
												}else if(acct_bacd == '2002' || acct_bacd == '3000' ){
													panel.down('[name=item_leng2]').focus(true, 10);
												}else {
													panel.down('[name=item_spec]').focus(true, 10);
												}
											}
										}
									}
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
									items	: [
										,{	fieldLabel	: Language.get('item_tick','두께'),
											xtype		: 'numericfield',
											name		: 'item_tick',
											width		: 100,
											value		: 0,
											minValue	: 0,
//											hidden		: acct[0] != '1001'? true : false,
											margin		: '0 0 5 0',
											style		: 'align: center !important',
											decimalPrecision : 1,
											enableKeyEvents : true,
											listeners	: {
												blur	: function(){
													var panel = this.up('form'),
														item_tick = this.getValue(),
														acct = me.down('[name=acct_bacd]').getValue();

													if(acct == '' || acct == null){
														Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
														this.reset();
													}else{
														me.calcul(acct);
													}
												},
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
														var acct = me.down('[name=acct_bacd]').getValue();
														panel.down('[name=item_leng]').focus(true, 10);

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}


														if(acct == '1001'){
															panel.down('[name=item_leng]').focus(true, 10);
														}
													}
												}
											}
										},{	fieldLabel	: Language.get('size','사이즈'),
											xtype		: 'numericfield',
											name		: 'item_leng',
//											hidden		: acct[0] != '1001' ? true : false,
											width		: 87,
											labelWidth	: 40,
											value		: 0,
											minValue	: 0,
											enableKeyEvents : true,
											listeners	: {
												change	: function(value){
													value = Math.abs(this.getValue());
												},
												blur	: function(){
													var panel = this.up('form'),
														item_leng = this.getValue(),
														acct = me.down('[name=acct_bacd]').getValue();

													if(acct == '' || acct == null){
														Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
														this.reset();
													}else{
														me.calcul(acct);
													}

												},
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
														var acct = me.down('[name=acct_bacd]').getValue();

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}

														if(acct == '1001'){
															panel.down('[name=item_widh]').focus(true, 10);
														}
													}
												}
											}
										},{	fieldLabel	: 'X',
											xtype		: 'numericfield',
											name		: 'item_widh',
//											hidden		: acct[0] != '1001'? true : false,
											labelWidth	: 15,
											width		: 62,
											value		: 0,
											minValue	: 0,
											enableKeyEvents : true,
											listeners	: {
												change	: function(value){
													value = Math.abs(this.getValue());
												},
												blur	: function(){
													var panel = this.up('form'),
														item_widh = this.getValue();

													if(item_widh != '' || item_widh != null){
														var acct = me.down('[name=acct_bacd]').getValue();

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}
													}
												},
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
															panel.down('[name=item_spec]').focus(true, 10),
														acct = me.down('[name=acct_bacd]').getValue();

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}

														if(acct == '1001'){
															panel.down('[name=mtrl_bacd_name]').focus(true, 10);
														}
													}
												},
											}
										},{	fieldLabel	: Language.get('size','사이즈'),
											xtype		: 'numericfield',
											name		: 'item_leng2',
											width		: 87,
											labelWidth	: 40,
											value		: 0,
											minValue	: 0,
											hidden		: true,
//											hidden		: acct[0].substr(0,1) == '1'? true : false,
											margin		: '0 0 5 30',
											enableKeyEvents : true,
											listeners	: {
												change	: function(value){
													value = Math.abs(this.getValue());
												},
												blur	: function(){
													var panel = this.up('form'),
														item_leng = this.getValue(),
														acct = me.down('[name=acct_bacd]').getValue();

													if(acct == '' || acct == null){
														Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
														this.reset();
													}else{
														me.calcul(acct);
													}
												},
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
														var acct = me.down('[name=acct_bacd]').getValue();

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}

														panel.down('[name=item_widh2]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: 'X',
											xtype		: 'numericfield',
											name		: 'item_widh2',
											labelWidth	: 15,
											width		: 62,
											value		: 0,
											minValue	: 0,
											margin		: '0 0 5 0',
											hidden		: true,
//											hidden		: acct[0].substr(0,1) == '1'? true : false,
											enableKeyEvents : true,
											listeners	: {
												change	: function(value){
													value = Math.abs(this.getValue());
												},
												blur	: function(){
													var panel = this.up('form'),
														item_widh = this.getValue(),
														item_leng = me.down('[name=item_leng2]').getValue(),
														acct = me.down('[name=acct_bacd]').getValue()
													;
														if(item_widh > 0 && item_leng > 0){
															if(acct == '' || acct == null){
																Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
																this.reset();
															}else{
																me.calcul(acct);
															}
														}
												},
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
														var acct = me.down('[name=acct_bacd]').getValue();

														if(acct == '' || acct == null){
															Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
															this.reset();
														}else{
															me.calcul(acct);
														}

														// 키이동
														if(acct == '3000'){
															panel.down('[name=mtrl_bacd_name]').focus(true, 10);
														}
													}
												},
											}
										}
									]
								},{ fieldLabel	: Language.get('item_spec','규격'),
									xtype		: 'textfield',
									name		: 'item_spec',
									itemId		: 'item_spec',
									width		: 250,
									enableKeyEvents : true,
									hidden		: acct[0].substr(0,1) == '2'? true:false,
									readOnly	: acct[0].substr(0,1) != '1' ?true:false,
									fieldCls	: acct[0].substr(0,1) != '1' ?'readonlyfield':'',
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || (e.keyCode == e.TAB && e.shiftKey==false)) {
												var panel = self.up('form');
												panel.down('[name=mtrl_bacd_name]').focus(true, 10);
											}
										},
									}
								},{	fieldLabel	: Language.get('mtrl_bacd_name','재질'),
									width		: 250,
									xtype		: 'popupfield',
									editable	: false,
									name		: 'mtrl_bacd_name',
									pair		: 'mtrl_bacd',
//									hidden		: acct[0].substr(0,1) != '1' ? true : false,
									clearable	: true ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101', find : '' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
											console.log(records[0].get('refn_valu_1fst'))
											console.log(acct[0].substr(0,1));
											console.log(acct[0]);
											if(acct[0].substr(0,1) == '1'){
												me.down('[name=spgr_valu2]').setValue(records[0].get('refn_valu_1fst'));
												console.log(me.down('[name=spgr_valu2]').getValue());
											}
											me.down('[name=mtrl_bacd_name]').popup.params.find = '';
										}
									},
									listeners	: {
										change	: function(value) {
											var val = this.getValue();
											if(val == '' || val == null){
												me.down('[name=spgr_valu2]').setValue('1');
												me.down('[name=mtrl_bacd]').setValue('');
												me.down('[name=mtrl_bacd_name]').popup.params.find = '';
											}else{
												me.down('[name=mtrl_bacd_name]').popup.params.find = '';
												me.down('[name=mtrl_bacd_name]').popup.params.find = val;
											}
										}
									}
								},{	name : 'mtrl_bacd', xtype : 'textfield' , hidden : true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
									hidden	: _global.options.mes_system_type !='Frame' ? true : false,
									items	: [
										{	fieldLabel	: Language.get('unit_wigt ','무게'),
											xtype		: 'numericfield',
											name		: 'unit_wigt',
											width		: 140,
											value		: 0,
											hidden		: acct[0] != '1001'? true : false,
											minValue	: 0,
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
														var panel = self.up('form');
														panel.down('[name=spgr_valu2]').focus(true, 10);
													}
												},
											}
										},{	text		: 'kg',
											xtype		: 'label',
											hidden		: acct[0] != '1001'? true : false,
											style		: 'font-weight: normal !important',
											margin		: '5   2',
										},{	fieldLabel	: Language.get('spgr_valu2 ','비중'),
											xtype		: 'numericfield',
											name		: 'spgr_valu2',
											value		: 1,
											minValue	: 1,
											width		: 95,
											labelWidth	: 25,
											hidden		: acct[0] != '1001'? true : false,
											margin		: '0 0 0 5',
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											enableKeyEvents : true,
											listeners	: {
												change : function(){
													var acct = me.down('[name=acct_bacd]').getValue();
													var item_leng = me.down('[name=item_leng]').getValue();
													var item_widh = me.down('[name=item_widh]').getValue();
													var item_tick = me.down('[name=item_tick]').getValue();
													if(acct == '' || acct == null){
														Ext.Msg.alert("알림","계정구분을 선택하여 주시기 바랍니다.");
														this.reset();
													}else{
														me.calcul(acct);
													}
												}
											}
										}
									]
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
		if(values.item_name==''||values.item_name==null){
			Ext.Msg.alert("알림","품명을 반드시  입력해주십시오.");
			return;
		};

		if(values.acct_bacd==''||values.acct_bacd==null){
			Ext.Msg.alert("알림","계정구분을 반드시 선택해주십시오.");
			return;
		};
		if(me.popup.params.dvcd == 'insert'){
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
			console.log(invc);
		}else{
			invc = me.popup.params.item_idcd;
			code = me.popup.params.item_code;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		console.log(values);
		Ext.Ajax.request({
			url		: _global.location.http() + '/item/itemmast/set/add_hj.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					item_idcd		: invc,
					item_code		: code,
					item_name		: values.item_name,
					item_spec		: values.item_spec,
					item_tick		: values.item_tick,
					item_tick2		: values.item_tick2,
					item_leng		: values.item_leng,
					item_widh		: values.item_widh,
					item_leng2		: values.item_leng2,
					item_widh2		: values.item_widh2,
					unit_wigt		: values.unit_wigt,
					spgr_valu2		: values.spgr_valu2,
					mtrl_bacd2		: values.mtrl_bacd2,
					mtrl_bacd_name2	: values.mtrl_bacd_name2,
					mtrl_bacd		: values.mtrl_bacd,
					mtrl_bacd_name	: values.mtrl_bacd_name,
					unit_idcd		: values.unit_idcd,
					acct_bacd		: values.acct_bacd,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					_set			: me.popup.params.dvcd
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
					Ext.Ajax.request({
						url		: _global.location.http() + '/item/itemmast/get/search.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								item_idcd		: invc,
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
//								console.log(result);
								me.setResponse( {success : true , values :  result.records });
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	},

	calcul:function(acct_bacd){
		var popup = this;
		var item_leng, item_widh, item_tick;
		var str = '';

		popup.down('[name=unit_wigt]').setValue(0);

		if(acct_bacd == '1001'){
			item_leng = popup.down('[name=item_leng]').getValue();
			item_widh = popup.down('[name=item_widh]').getValue();
			item_tick = popup.down('[name=item_tick]').getValue();
			spgr_valu2 = popup.down('[name=spgr_valu2]').getValue();

			if(spgr_valu2 > 0 && item_leng > 0 && item_widh > 0 && item_tick > 0 ){
				item_leng = popup.down('[name=item_leng]').getValue();
				item_widh = popup.down('[name=item_widh]').getValue();
				item_tick = popup.down('[name=item_tick]').getValue();
				spgr_valu2 = popup.down('[name=spgr_valu2]').getValue();
				if(item_leng > 0 && item_widh > 0 && item_tick > 0 && spgr_valu2 > 0){
					wight = (item_leng * item_widh * item_tick * spgr_valu2)/1000000;
					popup.down('[name=unit_wigt]').setValue(0);
					popup.down('[name=unit_wigt]').setValue(wight);
				}
			}

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

			popup.down('[name=item_spec]').setValue('');
			popup.down('[name=item_spec]').setValue(str);
		}else {
			item_leng = Number(popup.down('[name=item_leng]').getValue());
			item_widh = Number(popup.down('[name=item_widh]').getValue());

			str = String(item_leng)+'*'+String(item_widh);

			popup.down('[name=item_spec]').setValue('');
			popup.down('[name=item_spec]').setValue(str);
		}
	},

});
