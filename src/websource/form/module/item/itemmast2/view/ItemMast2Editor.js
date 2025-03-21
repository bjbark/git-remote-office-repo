Ext.define('module.custom.hantop.item.itemgroup.view.ItemMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast2-editor',

	height : 450,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','품목코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

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
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								name		: 'item_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=line_stat]').focus(true, 10);
										}
									},
								}
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=item_name]').focus(true, 10);
										}
									},
								}
							},{ fieldLabel	: Language.get('item_idcd','품목ID'),
								name		: 'item_idcd',
								xtype		: 'textfield',
								hidden		: true
							}
						]
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
						margin : '0 0 5 0',
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
									var panel = self.up('form');
									panel.down('[name=item_mtrl]').focus(true, 10);
								}
							},
						}
					},{	fieldLabel	: Language.get('item_mtrl','재질'),
						width		: 340,
						margin		: '0 0 5 0',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mtrl_bacd_name',
						pair		: 'mtrl_bacd',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-base-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101', find : ''},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
								me.down('[name=spgr_valu2]').setValue(records[0].get('refn_valu_1fst'));
							}
						},
						listeners : {
//							change : function(){
//								var val = this.getValue();
//								if(val != ''){
//									this.popup.params.find = this.getValue();
//								}
//							}
						}
					},{	xtype	: 'textfield', name : 'mtrl_bacd', hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						hidden		: !(_global.options.item_size_used_yorn == 1),
						items	: [
							,{	fieldLabel	: Language.get('item_tick','두께'),
								xtype		: 'numericfield',
								name		: 'item_tick',
								width		: 155,
								minValue	: 0.0,
								margin		: '0 0 0 0',
								style		: 'align: center !important',
								decimalPrecision : 1,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=item_leng]').focus(true, 10);

										}
									},
									change:function(){
										me.calcul2();
									}
								}
							},{	fieldLabel	: Language.get('','사이즈'),
								xtype		: 'numericfield',
								name		: 'item_leng',
								width		: 120,
								value		: 0,
								minValue	: 0,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=item_widh]').focus(true, 10);
										}
									},
									change:function(){
										me.calcul2();
									}
								}
							},{	fieldLabel	: 'X',
								xtype		: 'numericfield',
								name		: 'item_widh',
								labelWidth	: 10,
								width		: 65,
								value		: 0,
								minValue	: 0,
								enableKeyEvents : true,
								listeners	: {
									blur	: function(){
										var panel = this.up('form');
										panel.down('[name=item_spec]').focus(true, 10);
										me.calcul();
									},
									change:function(){
										me.calcul2();
									},
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=item_spec]').focus(true, 10);
											me.calcul();
										}
									},
								}
							}

						]
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 340,
						margin : '0 0 5 0',
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
									var panel = self.up('form');
									panel.down('[name=acct_bacd_name]').focus(true, 10);
								}
							},
						}
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								width		: 185,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
								listeners : {
									change : function(val,code){
//										var purc    = me.down('[name=edit_tab1]');
										var tabs    = me.down('[title=관리항목]').up('tabpanel');
//										var adon    = me.down('[name=edit_tab2]');
//										var desc    = me.down('[name=edit_tab3]');
//										var cont    = me.down('[name=edit_tab4]');
										var hidden1 = false;
										var hidden2 = false;

										if(code=='2001'||code=='2002'||code=='3000'){
											if((_global.options.item_adon_disp_yorn==0)){
												hidden2 = true;
											}
											hidden1 = true;
										}

//										if(hidden1==true && hidden2 ==false){
//											cont.down('[name=cont_pric]').setFieldLabel('판매단가');
//										}else if(hidden1==true && hidden2==true){
//											cont.down('[name=cont_pric]').setFieldLabel('판매단가');
//										}else{
//											cont.down('[name=cont_pric]').setFieldLabel('구매단가');
//										}
//										adon.tab.hide();
//										desc.tab.hide();
										switch (code) {
											case '1001' : {  /* 원재료  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
												break;
											};
											case '1002': {  /* 부재료  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
												break;
											};
											case '1003': {  /* 소모품  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
												break;
											};
											case '2001': {	/* 제공품  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
												break;
											};
											case '2002': {	/* 반제품  */
//												purc.tab.hide();
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												break;
											};
											case '3000': {	/* 제품  */
//												purc.tab.hide();
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												if	(_global.options.item_adon_disp_yorn==1
														&& _global.hq_id == 'N1000dooin') {
//													adon.tab.show();
//													tabs.setActiveTab(adon);
												}
												if	(_global.options.item_spec_disp_yorn==1) {
//													desc.tab.show();
//													tabs.setActiveTab(desc);
												}
												break;
											};
											case '4000': {	/* 상품  */
//												purc.tab.hide();
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												break;
											};
											case '5000': {	/* 집기비품  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(cont);
												break;
											};
											case '6000': {	/* 공구기구  */
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
												break;
											};
											default : {
//												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(purc);
											}
										};
									}
								}
							},{	fieldLabel	: '수불단위'/*Language.get('','수불단위')*/,
								xtype		: 'popupfield',
								width		: 150,
								margin		: '0 0 0 5',
								editable	: true,
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
								}
							},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('unit_wigt ','무게'),
								xtype		: 'numericfield',
								name		: 'unit_wigt',
								width		: 155,
								value		: 0,
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
							},{	text		: 'g',
//								name		: 'wigt_labl',
								xtype		: 'label',
//								labelWidth	: 5,
								style	: 'font-weight: normal !important',
								margin		: '5   2',
							},{	fieldLabel	: Language.get('spgr_valu2 ','비중'),
								xtype		: 'numericfield',
								name		: 'spgr_valu2',
								value		: 0,
								minValue	: 0,
								width		: 171,
								labelWidth	: 86,
								margin		: '0 0 0 5',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=stok_mngt_yorn]').focus(true, 10);
										}
									},
									change:function(){
										me.calcul2();
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('rtil_ddln_dcnt','유통기한'),
								xtype		: 'numericfield',
								name		: 'rtil_ddln_dcnt',
								width		: 185,
								margin		: '0 5 0 0',
								hidden		: (_global.options.haccp_item_yorn==0),
							},{	fieldLabel	: Language.get('rtil_ddln_dvcd'),
								xtype		: 'lookupfield',
								name		: 'rtil_ddln_dvcd',
								width		: 151,
								margin		: '0 5 0 0',
								lookupValue	: resource.lookup('rtil_ddln_dvcd'),
								editable	: false,
								hidden		: (_global.options.haccp_item_yorn==0),
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('yorn','재고관리'),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								width		: 155,
								labelWidth	: 65,
								lookupValue	: resource.lookup('yorn'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER ||  (e.keyCode == e.TAB && e.shiftKey==false)) {
											var panel = self.up('form');
											panel.down('[name=insp_type_name]').focus(true, 10);
										}
									},
								}
							},{	fieldLabel	: Language.get('yorn','인수검사여부'),
								xtype		: 'lookupfield',
								name		: 'rcpt_insp_yorn',
								width		: 185,
								labelWidth	: 100,
								lookupValue	: resource.lookup('yorn')
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('insp_type_name','검사유형'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'insp_type_name',
								pair		: 'insp_type_idcd',
								clearable	: true ,
								hidden		: (_global.options.item_insp_type_yorn==0), /* 여기를 수정할 경우 금형 등록 Editor 부분을 수정하여야 한다.  */
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-insptype-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('insp_type_name'));
										pairField.setValue(records[0].get('insp_type_idcd'));
									}
								}
							},{	name		: 'insp_type_idcd', xtype : 'textfield' , hidden : true
							}
						]
//					},{	fieldLabel	: Language.get('clss_desc','품목분류'),
//						width		: 340,
//						xtype		: 'popupfield',
//						editable	: true,
//						enableKeyEvents : true,
//						name		: 'clss_desc',
//						pair		: 'lcls_idcd',
//						clearable	: true ,
////						hidden		: _global.hq_id =='N1000hjsys',
//						popup: {
//							select : 'SINGLE',
//							widget : 'lookup-item-clss-popup',
//							params : { stor_grp : _global.stor_grp , line_stat : '0' },
//							result : function(records, nameField, pairField) {
//								me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
//								me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
//								me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
//								nameField.setValue(records[0].get('clss_desc'));
//							}
//						}
//					},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
//					},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
//					},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name : 'imge_chek2', xtype : 'textfield' , hidden : true
					}/*,{	fieldLabel	: Language.get('yorn','판매여부'),
						xtype		: 'lookupfield',
						name		: 'sale_psbl_yorn',
						width		: 170,
						lookupValue	: resource.lookup('yorn'),
						hidden		: _global.options.mtrl_sale_yorn==0
					}*/,{	fieldLabel	: Language.get('modify','수정'),
						xtype		: 'textfield',
						name		: 'modify',
						width		: 170,
						hidden		: true
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
				items	: [
					/*me.createTab1(),me.createTab2(),  me.createTab3(),me.createTab4(),*/
					{title : '첨부파일',xtype: 'module-itemmast2-editorlister'},
					me.createTab5(),
					{title : '메모',xtype: 'module-itemmast2-memolister'},
					{title : '관리항목',xtype: 'module-itemmast2-mngtlister'},
				]
			}
		;
		return item;
	},

//	createTab1 : function() {
//		var me = this,
//			item = {
//				title	: '자재정보',
//				xtype	: 'form-panel',
//				name	: 'edit_tab1',
//				dock	: 'left',
//				hidden	: true ,
//				region	: 'center',
//				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
//					items	: [
//						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
//							items	: [
//								{	fieldLabel	: Language.get('istt_wrhs_name','입고창고'),
//									xtype		: 'popupfield',
//									editable	: true,
//									enableKeyEvents : true,
//									name		: 'istt_wrhs_name',
//									pair		: 'istt_wrhs_idcd',
//									clearable	: false ,
//									popup		: {
//										select	: 'SINGLE',
//										widget	: 'lookup-wrhs-popup',
//										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//										result	: function(records, nameField, pairField) {
//											nameField.setValue(records[0].get('wrhs_name'));
//											pairField.setValue(records[0].get('wrhs_idcd'));
//										}
//									}
//								},{	name		: 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true
//								},{	fieldLabel	: Language.get('base_vend_idcd','기본구매처'),
//									xtype		: 'popupfield',
//									editable	: true,
//									enableKeyEvents : true,
//									name		: 'base_vend_name',
//									pair		: 'base_vend_idcd',
//									clearable	: false ,
//									popup		: {
//										select	: 'SINGLE',
//										widget	: 'lookup-cstm-popup',
//										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//										result	: function(records, nameField, pairField) {
//											nameField.setValue(records[0].get('cstm_name'));
//											pairField.setValue(records[0].get('cstm_idcd'));
//										}
//									}
//								},{	name	: 'base_vend_idcd', xtype : 'textfield' , hidden : true
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('yorn','자동입고'),
//											xtype		: 'lookupfield',
//											name		: 'auto_istt_yorn',
//											lookupValue	: resource.lookup('yorn'),
//											width		: 170
//										},{	fieldLabel	: Language.get('coun_iout_dvcd','국내/수입'),
//											xtype		: 'lookupfield',
//											name		: 'coun_iout_dvcd',
//											width		: 171,
//											lookupValue	: resource.lookup('coun_iout_dvcd')
//										}
//									]
//								},{	fieldLabel	: Language.get('drtr_name','구매담당'),
//									xtype		: 'popupfield',
//									editable	: true,
//									enableKeyEvents : true,
//									name		: 'drtr_name',
//									pair		: 'drtr_idcd',
//									clearable	: false ,
//									popup		: {
//										select	: 'SINGLE',
//										widget	: 'lookup-user-popup',
//										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//										result	: function(records, nameField, pairField) {
//											nameField.setValue(records[0].get('user_name'));
//											pairField.setValue(records[0].get('user_idcd'));
//										}
//									}
//								},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('yorn','인수검사여부'),
//											xtype		: 'lookupfield',
//											name		: 'rcpt_insp_yorn',
//											width		: 170,
//											lookupValue	: resource.lookup('yorn')
//										},{	fieldLabel	: Language.get('puch_pric','구매단가'),
//											xtype		: 'numericfield',
//											name		: 'puch_pric',
//											width		: 171,
//											hidden		: (!_global.hqof_idcd=='N1000DOWON')
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('minm_puch_qntt','최소구매량'),
//											xtype		: 'numericfield',
//											name		: 'minm_puch_qntt',
//											width		: 170
//										},{	fieldLabel	: Language.get('puch_itvl_qntt','구매간격량'),
//											xtype		: 'numericfield',
//											name		: 'puch_itvl_qntt',
//											width		: 171,
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('avrg_supl_dcnt','평균조달일수'),
//											xtype		: 'numericfield',
//											name		: 'avrg_supl_dcnt',
//											width		: 170
//										},{	fieldLabel	: Language.get('optm_offr_volm','적정발주량'),
//											xtype		: 'numericfield',
//											name		: 'optm_offr_volm',
//											width		: 171
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('ogin_bacd_name','원산지분류'),
//											xtype		: 'popupfield',
//											editable	: true,
//											enableKeyEvents : true,
//											name		: 'ogin_bacd_name',
//											pair		: 'ogin_bacd',
//											clearable	: false ,
//											popup		: {
//												select	: 'SINGLE',
//												widget	: 'lookup-base-popup',
//												params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1202' },
//												result	: function(records, nameField, pairField) {
//													nameField.setValue(records[0].get('base_name'));
//													pairField.setValue(records[0].get('base_code'));
//												}
//											}
//										},{	name		: 'ogin_bacd', xtype : 'textfield' , hidden : true
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
//									items	: [
//										{	fieldLabel	: Language.get('make_cmpy_name','제조회사명'),
//											xtype		: 'textfield',
//											name		: 'make_cmpy_name',
//											width		: 342
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin		: '-5 0 0 0',
//									items	: [
//										{	fieldLabel	: Language.get('sale_psbl_yorn','판매가능여부'),
//											xtype		: 'lookupfield',
//											name		: 'sale_psbl_yorn',
//											width		: 170,
//											lookupValue	: resource.lookup('yorn'),
//										}
//									]
//								}
//							]
//						}
//					]
//			}
//			;
//			return item;
//	},
	createTab2 : function() {
		var me = this,
			item = {
				title	: '생산정보',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab2',
				region	: 'center',
				hidden	: (_global.options.item_adon_disp_yorn==0&&_global.hq_id != 'N1000dooin'),
				fieldDefaults	: { width : 360, labelWidth : 100, labelSeparator : ''},
					items	: [
						{	fieldLabel	: Language.get('istt_wrhs_name','입고창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'istt_wrhs_name1',
							pair		: 'istt_wrhs_idcd1',
							margin		: '10 0 2 0',
							clearable	: false ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-wrhs-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name		: 'istt_wrhs_idcd1', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('ostt_wrhs_name','출고창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'ostt_wrhs_name',
							pair		: 'ostt_wrhs_idcd',
							clearable	: false ,
							margin		: '0 0 2 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-wrhs-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name	: 'ostt_wrhs_idcd', xtype : 'textfield' , hidden : true
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_01','수출용'),
									xtype		: 'numericfield',
									name		: 'item_pkge_01',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_02','수출용(물결)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_02',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_03','수출용(후가공)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_03',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_04','플라스틱인박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_04',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_13','두인단프라'),
									xtype		: 'numericfield',
									name		: 'item_pkge_05',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_06','두인단프라2'),
									xtype		: 'numericfield',
									name		: 'item_pkge_06',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_07','두인단프라(트레이)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_07',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_08','단프라(벌크)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_08',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_09','두인단프라(물결)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_09',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_10','연우종이/단프라'),
									xtype		: 'numericfield',
									name		: 'item_pkge_10',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_11','연우중박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_11',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_12','연우대박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_12',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_13','트레이'),
									xtype		: 'numericfield',
									name		: 'item_pkge_13',
									width		: 182,
									labelWidth	: 100,
								}
							]
						},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'mold_name',
							pair		: 'mold_idcd',
							clearable	: false ,
							margin		: '2 0 2 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-mold-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('mold_name'));
									pairField.setValue(records[0].get('mold_idcd'));
								}
							}
						},{	name	: 'mold_idcd', xtype : 'textfield' , hidden : true
						}
					]
			}
			;
			return item;
	},
//	createTab3 : function() {
//		var me = this,
//			item = {
//				title	: '나사속성',
//				xtype	: 'form-panel',
//				name	: 'edit_tab3',
//				dock	:'left',
//				region	: 'center',
//				hidden	: (_global.options.item_spec_disp_yorn==0),
//				fieldDefaults	: { width : 290, labelWidth : 100, labelSeparator : ''},
//				items	: [
//					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
//						items	: [
//							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//								items	: [
//									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//										items	: [
//											{	fieldLabel	: Language.get('drwg_numb','도면번호'),
//												xtype		: 'textfield',
//												name		: 'drwg_numb',
//												width		: 244,
//												labelWidth	: 69
//											},{	fieldLabel	: Language.get('item_spec','규격'),
//												xtype		: 'numericfield',
//												name		: 'leng_valu',
//												labelWidth	: 26,
//												width		: 61,
//												listeners	:{
//													blur:function(){
//														me.setSpec();
//													}
//												}
//											},{	fieldLabel	: '/',
//												xtype		: 'numericfield',
//												name		: 'leng_valu_2snd',
//												width		: 38,
//												labelWidth	: 3,
//												listeners	:{
//													blur:function(){
//														me.down('[name=fixd_leng]').setValue(this.getValue());
//														me.setSpec();
//													}
//												}
//											},{	fieldLabel	: '-',
//												xtype		: 'numericfield',
//												name		: 'widh_valu',
//												width		: 38,
//												labelWidth	: 3,
//												listeners	:{
//													blur:function(){
//														me.setSpec();
//													}
//												}
//											},{	fieldLabel	: '-',
//												xtype		: 'numericfield',
//												name		: 'tick_valu',
//												width		: 38,
//												labelWidth	: 3,
//												listeners	:{
//													blur:function(){
//														me.setSpec();
//													}
//												}
//											}
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//										items	: [
//											{	xtype		: 'textfield',
//												name		: 'tick_unit',
//												width		: 53,
//												emptyText	: '단위',
//												hidden		: true ,
//												value		: 'mm'
//											},{	fieldLabel	: Language.get('bolt_unit_dvcd','사양'),
//												xtype		: 'lookupfield',
//												name		: 'bolt_unit_dvcd',
//												lookupValue	: resource.lookup('bolt_unit_dvcd'),
//												width		: 135,
//												hidden		: true,
//												labelWidth	: 70
//											},{	fieldLabel	: Language.get('mtty_dvcd','산형'),
//												xtype		: 'lookupfield',
//												name		: 'mtty_dvcd',
//												lookupValue	: resource.lookup('mtty_dvcd'),
//												width		: 140,
//												labelWidth	: 69
//											},{	fieldLabel	: 'TAPER길이',
//												xtype		: 'numericfield',
//												name		: 'bolt_dvcd',
//												width		: 104,
//												labelWidth	: 59,
//												decimalPrecision : 1
//											},{	fieldLabel	: 'TAPER깊이율(%)',
//												xtype		: 'numericfield',
//												name		: 'tper_dprt',
//												labelWidth	: 125,
//												width		: 175,
//												value		: '85',
//												maxValue	: 999,
//												minValue	: 1
//											},
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 74',
//										items	: [
//											{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox', align: 'stretch' } ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 170,
//												margin	: '0 0 2 0',
//												items	: [
//													{	text	: 'JIS', xtype : 'label', style : 'text-align:center;'
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	fieldLabel	: '호칭',
//																xtype		: 'textfield',
//																name		: 'jiss_name',
//																width		: 78,
//																labelWidth	: 24,
//																listeners	: {
//																	blur:function(){
//																		me.chk('JIS');
//																	}
//																}
//															},{	fieldLabel	: '피치',
//																xtype		: 'numericfield',
//																name		: 'jiss_pich',
//																width		: 78,
//																labelWidth	: 24,
//																listeners	: {
//																	blur:function(){
//																		me.chk('JIS');
//																	}
//																}
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox', align: 'stretch' } ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 173,
//												margin	: '0 0 5 3',
//												items	: [
//													{	text	: 'Inch', xtype : 'label', style : 'text-align:center;'
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	fieldLabel	: '호칭',
//																xtype		: 'popupfield',
//																editable	: true,
//																enableKeyEvents : true,
//																name		: 'inch_name_code',
//																pair		: 'inch_otsd_dimt',
//																clearable	: false ,
//																width		: 85,
//																labelWidth	: 24,
//																popup		: {
//																	select	: 'SINGLE',
//																	widget	: 'lookup-bolt-numb-popup',
//																	params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//																	result	: function(records, nameField, pairField) {
//																		nameField.setValue(records[0].get('btno_code'));
//																		pairField.setValue(records[0].get('otsd_dimt'));
//																	}
//																},
//																listeners	: {
//																	blur:function(){
//																		me.chk('Inch');
//																	}
//																}
//															},{	fieldLabel	: '산수',
//																xtype		: 'textfield',
//																name		: 'inch_mtct',
//																width		: 78,
//																labelWidth	: 24,
//																listeners	: {
//																	blur:function(){
//																		me.chk('Inch');
//																	}
//																}
//															}
////															,{	fieldLabel	: '외경',
////																xtype		: 'numericfield',
////																name		: 'inch_otsd_dimt',
////																hidden		: true
////															}
//														]
//													}
//												]
//											},
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//										items	: [
//											{	fieldLabel	: Language.get('fixd_leng','고정길이'),
//												xtype		: 'numericfield',
//												name		: 'fixd_leng',
//												labelWidth	: 70,
//												width		: 150,
//												hidden		: true
//											}
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//										items	: [
//											{	fieldLabel	: Language.get('mntn_dpth','산깊이'),
//												xtype		: 'numericfield',
//												name		: 'mntn_dpth',
//												labelWidth	: 70,
//												hidden		: true,
//												width		: 120
//											},{	fieldLabel	: Language.get('mtrl_dimt','소재경'),
//												xtype		: 'numericfield',
//												name		: 'mtrl_dimt',
//												labelWidth	: 40,
//												hidden		: true,
//												width		: 78
//											},{	fieldLabel	: '외경',
//												xtype		: 'numericfield',
//												name		: 'inch_otsd_dimt',
//												labelWidth	: 40,
//												width		: 90,
//												hidden		: true
//											},{	xtype		: 'button',
//												text		: '<span class="btnTemp" style="font-size:1.5em !important;">특성재계산</span>',
//												margin		: '0 0 3 75',
//												width		: 345,
//												handler		: me.calc,
//												cls			: 'button-style'
//											}
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
//										items	: [
//											{	fieldLabel	: Language.get('tper_leng','TAPER길이'),
//												xtype		: 'numericfield',
//												name		: 'tper_leng',
//												labelWidth	: 70,
//												width		: 150
//											},{	fieldLabel	: Language.get('tper_dpth','(깊이)'),
//												xtype		: 'numericfield',
//												name		: 'tper_dpth',
//												labelWidth	: 70,
//												width		: 130
//											},{	fieldLabel	: Language.get('tper_angl','(각)'),
//												xtype		: 'textfield',
//												name		: 'tper_angl',
//												labelWidth	: 50,
//												width		: 140
//											}
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 74',
//										items	: [
//											{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox' } ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 2 0',
//												items	: [
//													{	text	: 'h', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 25',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'h_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox'} ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 5 1',
//												items	: [
//													{	text	: 'a', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 25',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'a_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer',
//												layout	: { type: 'vbox'},
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 5 1',
//												items	: [
//													{	text	: 'b', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 25',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'b_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer',
//												layout	: { type: 'vbox'} ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 5 1',
//												items	: [
//													{	text	: 'Ra', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 20',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'ra_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox'} ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 5 1',
//												items	: [
//													{	text	: 'Rb', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 20',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'rb_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},{	xtype	: 'fieldcontainer'  ,
//												layout	: { type: 'vbox'} ,
//												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//												width	: 57,
//												margin	: '0 0 5 1',
//												items	: [
//													{	text	: 'H', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 25',
//													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//														items	: [
//															{	xtype		: 'numericfield',
//																name		: 'h2_valu',
//																width		: 52
//															}
//														]
//													}
//												]
//											},
//										]
//									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0', hidden : true,
//										items	: [
//											{	fieldLabel	: Language.get('tper_angl_stte','('),
//												xtype		: 'numericfield',
//												name		: 'tper_angl_stte',
//												labelWidth	: 5,
//												width		: 60
//											},{	fieldLabel	: Language.get('tper_angl_mint','도'),
//												xtype		: 'numericfield',
//												name		: 'tper_angl_mint',
//												labelWidth	: 5,
//												width		: 60
//											},{	xtype		: 'label',
//												width		: 20,
//												text		: '분)',
//												margin		: '2 0 0 0'
//											}
//										]
//									},{	xtype : 'fieldset' ,
//										layout : 'hbox',
//										padding:'0',margin : '0 0 4 0',
//										border: 0,
//										items : [
//											{	fieldLabel	: Language.get('half_pich','반피치'),
//												xtype		: 'numericfield',
//												name		: 'half_pich',
//												labelWidth	: 70,
//												width		: 150
//											},{	fieldLabel	: Language.get('sinn_valu','SIN값'),
//												xtype		: 'numericfield',
//												name		: 'sinn_valu',
//												labelWidth	: 40,
//												width		: 130
//											},{	fieldLabel	: Language.get('bolt_dpth','깊이'),
//												xtype		: 'numericfield',
//												name		: 'bolt_dpth',
//												labelWidth	: 50,
//												width		: 140
//											}
//										]
//									},{	xtype : 'fieldset' ,
//										layout : 'hbox',
//										padding:'0',margin : '0 0 4 0',
//										border: 0,
//										items : [
//											{	fieldLabel	: Language.get('h_valu_scpe','범위'),
//												xtype		: 'textfield',
//												name		: 'h_valu_scpe',
//												labelWidth	: 70,
//												width		: 150
//											},{	fieldLabel	: Language.get('a_valu_scpe','a범위'),
//												xtype		: 'textfield',
//												name		: 'a_valu_scpe',
//												labelWidth	: 40,
//												width		: 130
//											},{	fieldLabel	: Language.get('b_valu_scpe','b범위'),
//												xtype		: 'textfield',
//												name		: 'b_valu_scpe',
//												labelWidth	: 50,
//												width		: 140
//											}
//										]
//									},{	xtype : 'fieldset' ,
//										layout : 'hbox',
//										padding:'0',margin : '0 0 4 0',
//										border: 0,
//										items : [
//											{	fieldLabel	: Language.get('lead_angl','리드각'),
//												xtype		: 'textfield',
//												name		: 'lead_angl',
//												labelWidth	: 70,
//												width		: 150
//											},{	fieldLabel	: Language.get('','('),
//												xtype		: 'numericfield',
//												name		: 'lead-angl_stte',
//												labelWidth	: 5,
//												width		: 60,
//												hidden		: true
//											},{	fieldLabel	: Language.get('','도'),
//												xtype		: 'numericfield',
//												name		: 'lead_angl_mint',
//												labelWidth	: 5,
//												width		: 60,
//												hidden		: true
//											},{	xtype		: 'label',
//												width		: 20,
//												text		: '분)',
//												margin		: '2 0 0 0',
//												hidden		: true
//											},{	fieldLabel	: Language.get('tolr_valu','공차'),
//												xtype		: 'textfield',
//												name		: 'tolr_valu',
//												labelWidth	: 40,
//												width		: 270
//											}
//										]
//									}
//								]
//							}
//						]
//					}
//				]
//		}
//		;
//		return item;
//	},

//	createTab4 : function() {
//		var me = this,
//			item = {
//				title	: '제품정보 및 계약사항',
//				xtype	: 'form-panel',
//				dock	:'left',
//				name	: 'edit_tab4',
//				region	: 'center',
//				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' },
//					items	: [
//						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 , margin : '10 0 0 0',
//							items	: [
//								{	fieldLabel	: Language.get('cont_cstm_name','거래처'),
//									xtype		: 'popupfield',
//									editable	: false,
//									enableKeyEvents : true,
//									width		: 432,
//									name		: 'cont_cstm_name',
//									pair		: 'cont_cstm_idcd',
//									clearable	: true ,
//									popup: {
//										select : 'SINGLE',
//										widget : 'lookup-cstm-popup',
//										params : { stor_grp : _global.stor_grp , line_stat : '0' },
//										result : function(records, nameField, pairField) {
//											nameField.setValue(records[0].get('cstm_name'));
//											pairField.setValue(records[0].get('cstm_idcd'));
//										}
//									}
//								},{	name : 'cont_cstm_idcd', xtype : 'textfield' , hidden :true
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('cont_date','계약일자'),
//											xtype		: 'datefield',
//											name		: 'cont_date',
//											width		: 200,
//											format		: Const.DATE_FORMAT_YMD_BAR,
//											submitFormat: Const.DATE_FORMAT_YMD
//										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 0 0',
//											items	: [
//												{	fieldLabel	: Language.get('deli_dcnt','납기일수'),
//													xtype		: 'numericfield',
//													width		: 201,
//													name		: 'deli_dcnt',
//													margin		: '0 0 0 33',
//												}
//											]
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 5 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('trnt_mthd_dvcd','운송방법'),
//											xtype		: 'lookupfield',
//											name		: 'trnt_mthd_dvcd',
//											lookupValue	: resource.lookup('trnt_mthd_dvcd'),
//											editable	: false
//										},{	fieldLabel	: Language.get('cont_drtr_name','담당자'),
//											xtype		: 'popupfield',
//											editable	: true,
//											enableKeyEvents : true,
//											name		: 'cont_drtr_name',
//											pair		: 'cont_drtr_idcd',
//											clearable	: false ,
//											width		: 201,
//											margin		: '0 0 0 33',
//											popup: {
//												select : 'SINGLE',
//												widget : 'lookup-user-popup',
//												params : { stor_grp : _global.stor_grp , line_stat : '0' },
//												result : function(records, nameField, pairField) {
//													nameField.setValue(records[0].get('user_name'));
//													pairField.setValue(records[0].get('user_idcd'));
//												}
//											}
//										},{	name : 'cont_drtr_idcd', xtype : 'textfield' , hidden : true
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 29',
//									items	: [
//									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
//										items	: [
//												{	fieldLabel	: Language.get('','검사여부'),
//													xtype		: 'textfield',
//													labelWidth	: 50,
//													width		: 15,
//													margin		: '10 40 0 0'
//												}
//											]
//										},{	xtype	: 'fieldcontainer'  ,
//											layout	: { type: 'vbox'} ,
//											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//											width	: 116,
//											margin	: '0 0 5 1',
//											items	: [
//												{	text	: '초물', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 45',
//												},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//													items	: [
//														{	xtype		: 'lookupfield',
//															name		: 'ftmr_insp_yorn',
//															width		: 110,
//															lookupValue	: resource.lookup('yorn')
//														}
//													]
//												},
//											]
//										},{	xtype	: 'fieldcontainer'  ,
//											layout	: { type: 'vbox'} ,
//											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//											width	: 116,
//											margin	: '0 0 5 1',
//											items	: [
//												{	text	: '중물', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 45',
//												},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//													items	: [
//														{	xtype		: 'lookupfield',
//															name		: 'mdmr_insp_yorn',
//															width		: 110,
//															lookupValue	: resource.lookup('yorn')
//														}
//													]
//												},
//											]
//										},{	xtype	: 'fieldcontainer'  ,
//											layout	: { type: 'vbox'} ,
//											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
//											width	: 116,
//											margin	: '0 0 5 1',
//											items	: [
//												{	text	: '종물', xtype : 'label', style : 'text-align:center;' , margin : '0 2 5 45',
//												},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 2 2 2',
//													items	: [
//														{	xtype		: 'lookupfield',
//															name		: 'ltmr_insp_yorn',
//															width		: 110,
//															lookupValue	: resource.lookup('yorn')
//														}
//													]
//												},
//											]
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 5 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('cnsr_pric','소비가'),
//											xtype		: 'numericfield',
//											name		: 'cnsr_pric'
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 0 0',
//									items	: [
//										{	fieldLabel	: Language.get('shpm_pric_1fst','출고단가1'),
//											xtype		: 'numericfield',
//											name		: 'shpm_pric_1fst',
//											width		: 201
//										},{	fieldLabel	: Language.get('shpm_pric_2snd','출고단가2'),
//											xtype		: 'numericfield',
//											name		: 'shpm_pric_2snd',
//											width		: 201,
//											margin		:'0 0 0 33',
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('shpm_pric_3trd','출고단가3'),
//											xtype		: 'numericfield',
//											name		: 'shpm_pric_3trd',
//											width		: 201,
//										},{	fieldLabel	: Language.get('shpm_pric_4frt','출고단가4'),
//											xtype		: 'numericfield',
//											name		: 'shpm_pric_4frt',
//											width		: 201,
//											margin		:'0 0 0 33',
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('shpm_pric_5fit','출고단가5'),
//											xtype		: 'numericfield',
//											name		: 'shpm_pric_5fit',
//											width		: 201,
//										},{	fieldLabel	: Language.get('stok_sale_yorn','재고판매'),
//											xtype		: 'lookupfield',
//											name		: 'stok_sale_yorn',
//											width		: 201,
//											lookupValue	: resource.lookup('yorn'),
//											margin		:'0 0 0 33',
//										}
//									]
//								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 5 0',
//									items	: [
//										{	fieldLabel	: Language.get('wkfw_name','생산라인'),
//											xtype		: 'popupfield',
//											editable	: true,
//											enableKeyEvents : true,
//											name		: 'wkfw_name2',
//											pair		: 'wkfw_idcd2',
//											clearable	: false ,
//											hidden		: !(_global.options.prod_line_used_yorn==1),
//											popup		: {
//												select	: 'SINGLE',
//												widget	: 'lookup-wkfw-popup',
//												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//												result	: function(records, nameField, pairField) {
//													nameField.setValue(records[0].get('wkfw_name'));
//													pairField.setValue(records[0].get('wkfw_idcd'));
//												}
//											}
//										},{	name		: 'wkfw_idcd2', xtype : 'textfield' , hidden : true
////										},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
////											xtype		: 'popupfield',
////											editable	: true,
////											enableKeyEvents : true,
////											name		: 'mold_name',
////											pair		: 'mold_idcd',
////											clearable	: false ,
////											hidden		: !(_global.options.mold_used_yorn==1),
////											width		: 201,
////											margin		: '0 0 0 33',
////											popup		: {
////												select	: 'SINGLE',
////												widget	: 'lookup-mold-popup',
////												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
////												result	: function(records, nameField, pairField) {
////													nameField.setValue(records[0].get('mold_name'));
////													pairField.setValue(records[0].get('mold_idcd'));
////												}
////											}
////										},{	name	: 'mold_idcd', xtype : 'textfield' , hidden : true
//										}
//									]
//								}
//							]
//						}
//					]
//				}
//		;
//		return item;
////		return form;
//	},
	createTab5 : function() {
		var me = this,
			item = {
				title	: '이미지',
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: 'system/item/itemmast2/set/fileUpload.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
											items	:[
												{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지1',
													itemId		: 'files1',
													msgTarget	: 'side',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png|jpeg)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
//																	Ext.get('prjt_work_imge').dom.src = event.target.result;
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}Ext.ComponentQuery.query('module-itemmast2-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
												},{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지2',
													msgTarget	: 'side',
													itemId		: 'files2',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek2]').setValue('Y');
																	form.down('[name=image2]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}Ext.ComponentQuery.query('module-itemmast2-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
												},{xtype:'hiddenfield', name:'param', value:''
												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
											]
										}
									]
								}
							]
						},{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									id		: 'prjt_work_imge',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id		: 'prjt_work_imge2',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 160',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'item_imge2',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image2]').setSrc(url);
									}else{
										this.up('form').down('[name=image2]').setSrc('');
									}
								}
							}
						}
					]
				}
			;
		return item;
	},
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	calc:function(){
		var me			= this,
			form		= me.up('form'),
			leng_valu	= form.down('[name=leng_valu]'),
			leng_valu_2snd	= form.down('[name=leng_valu_2snd]'),
			widh_valu	= form.down('[name=widh_valu]'),
			tick_valu	= form.down('[name=tick_valu]'),
			jiss_name	= form.down('[name=jiss_name]'),
			inch_name	= form.down('[name=inch_name_code]'),
			jiss_pich	= form.down('[name=jiss_pich]'),
			inch_mtct	= form.down('[name=inch_mtct]'),
			inch_otsd_dimt= form.down('[name=inch_otsd_dimt]'),
			mntn_dpth	= form.down('[name=mntn_dpth]'),
			mtrl_dimt	= form.down('[name=mtrl_dimt]'),
			bolt_unit_dvcd = form.down('[name=bolt_unit_dvcd]'),
			bolt_dvcd	= form.down('[name=bolt_dvcd]'),
			mtty_dvcd	= form.down('[name=mtty_dvcd]'),
			otsd_dimt	= form.down('[name=inch_otsd_dimt]'),
			tper_dprt	= form.down('[name=tper_dprt]'),
			mainForm	= form.up('form').down('form'),
			store		= Ext.ComponentQuery.query('module-itemmast2-lister')[0],
			item_idcd	= mainForm.down('[name=item_idcd]'),
			param_pich	= undefined,
			param_name	= undefined	,
			param_otsd	= undefined	;
		if	(bolt_unit_dvcd.getValue() == 'JIS') {
			param_name	= jiss_name.getValue();
			param_pich	= jiss_pich.getValue();
			param_otsd	= otsd_dimt.getValue();
		} else {
			param_name	= inch_name.getValue();
			param_pich	= inch_mtct.getValue();
			param_otsd	= otsd_dimt.getValue();
		};
		if(    leng_valu.getValue()      == null || leng_valu.getValue()      == ''
			|| leng_valu_2snd.getValue() == null || leng_valu_2snd.getValue() == ''
			|| widh_valu.getValue()      == null || widh_valu.getValue()      == ''
			|| tick_valu.getValue()      == null || tick_valu.getValue()      == ''){
			Ext.Msg.alert("알림","규격을 입력해주세요.");
			return;
		}else if(bolt_unit_dvcd.getValue() == null || bolt_unit_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","JIS 혹은 Inch를 입력해주세요.");
			return;
		}else if(mtty_dvcd.getValue() == null || mtty_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","산형구분을 선택해주세요.");
			return;
		}else if(bolt_dvcd.getValue() == null || bolt_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","TAPER길이를 선택해주세요.");
			return;
		}else if(param_name == null || param_name == ''){
			Ext.Msg.alert("알림","호칭을 입력해주세요.");
			return;
		}else if(param_pich == null){
			Ext.Msg.alert("알림","피치를 입력해주세요.");
			return;
//		}else if(mntn_dpth.getValue() == null || !(mntn_dpth.getValue()>0) ){
//			Ext.Msg.alert("알림","산깊이를 입력해주세요.");
//			return;
//		}else if(mtrl_dimt.getValue() == null || !(mtrl_dimt.getValue()>0) ){
//			Ext.Msg.alert("알림","소재경을 입력해주세요.");
//			return;
		}else {
			var spec = leng_valu.getValue()+'/'+leng_valu_2snd.getValue()+'-'+widh_valu.getValue()+'-'+tick_valu.getValue();
			Ext.Ajax.request({
				url		: _global.location.http() + '/item/itemmast2/get/item_bolt_calc.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id		,
						hqof_idcd		: _global.hqof_idcd		,
						bolt_unit_dvcd	: bolt_unit_dvcd.getValue(),
						bolt_dvcd		: bolt_dvcd.getValue()	,
						mtty_dvcd		: mtty_dvcd.getValue()	,
						mntn_dpth		: mntn_dpth.getValue()	,
						mtrl_dimt		: mtrl_dimt.getValue()	,
						bolt_name		: param_name,
						pitch			: param_pich,
//						otsd_dimt		: param_otsd,
						item_idcd		: item_idcd.getValue()	,
						item_spec		: spec,
						tper_dprt			: tper_dprt.getValue(),
						runn_dvcd		: 'test'		//real , test
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
						form.down('[name=tper_leng]').setValue(result.records[0].tper_leng);
						form.down('[name=tper_dpth]').setValue(result.records[0].tper_dpth);
						form.down('[name=tper_angl]').setValue(result.records[0].tper_angl);
						form.down('[name=h_valu]').setValue(result.records[0].h_valu);
						form.down('[name=a_valu]').setValue(result.records[0].a_valu);
						form.down('[name=b_valu]').setValue(result.records[0].b_valu);
						form.down('[name=ra_valu]').setValue(result.records[0].ra_valu);
						form.down('[name=rb_valu]').setValue(result.records[0].rb_valu);
						form.down('[name=h2_valu]').setValue(result.records[0].h2_valu);
						form.down('[name=mntn_dpth]').setValue(result.records[0].mntn_dpth);
						form.down('[name=mtrl_dimt]').setValue(result.records[0].mtrl_dimt);
						form.down('[name=half_pich]').setValue(result.records[0].half_pich);
						form.down('[name=sinn_valu]').setValue(result.records[0].sinn_valu);
						form.down('[name=tolr_valu]').setValue(result.records[0].tolr_valu);
						form.down('[name=a_valu_scpe]').setValue(result.records[0].a_valu_scpe);
						form.down('[name=b_valu_scpe]').setValue(result.records[0].b_valu_scpe);
						form.down('[name=lead_angl]').setValue(result.records[0].lead_angl);
						form.down('[name=h_valu_scpe]').setValue(result.records[0].h_valu_scpe);
						form.down('[name=a_valu_scpe]').setValue(result.records[0].a_valu_scpe);
						form.down('[name=b_valu_scpe]').setValue(result.records[0].b_valu_scpe);

						Ext.Msg.alert('알림','특성재계산을 완료하였습니다.');
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	chk:function(comp){
		var me = this,
			jiss_pich		= me.down('[name=jiss_pich]').getValue(),
			jiss_name		= me.down('[name=jiss_name]').getValue(),
			inch_name_code	= me.down('[name=inch_name_code]').getValue(),
			inch_mtct		= me.down('[name=inch_mtct]').getValue()
			bolt_unit_dvcd		= me.down('[name=bolt_unit_dvcd]')
		;
		if(comp == "JIS"){
			if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)||(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
				Ext.Msg.alert('알림',"JIS와 Inch중 하나만 입력하여주세요.");
				me.down('[name=jiss_pich]').setValue("");
				me.down('[name=jiss_name]').setValue("");
				return;
			}else{
				if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)&&(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
					bolt_unit_dvcd.setValue(comp);
				}else{
					if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)&&(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
						bolt_unit_dvcd.setValue("Inch");
					}
					else{
						bolt_unit_dvcd.setValue("");
					}
				}
			}
		}else{
			if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)||(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
				Ext.Msg.alert('알림',"JIS와 Inch중 하나만 입력하여주세요.");
				me.down('[name=inch_name_code]').setValue("");
				me.down('[name=inch_mtct]').setValue("");
				return;
			}
			if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)&&(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
				bolt_unit_dvcd.setValue(comp);
			}else{
				if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)&&(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
					bolt_unit_dvcd.setValue("JIS");
				}else{
					bolt_unit_dvcd.setValue("");
				}
			}
		}
	},
	setSpec:function(){
		var me = this,
			leng_valu		= me.down('[name=leng_valu]').getValue(),
			leng_valu_2snd	= me.down('[name=leng_valu_2snd]').getValue(),
			widh_valu		= me.down('[name=widh_valu]').getValue(),
			tick_valu		= me.down('[name=tick_valu]').getValue(),
			form			= me.down('#mainForm')
		;
		if(    leng_valu != null && leng_valu != ""
			&& leng_valu_2snd != null && leng_valu_2snd != ""
			&& widh_valu != null && widh_valu != ""
			&& tick_valu != null && tick_valu != ""		){
			var val = leng_valu+'/'+leng_valu_2snd+'-'+widh_valu+'-'+tick_valu;
			form.down('[name=item_spec]').setValue(val);
		}
	},

	calcul:function(){
		var editor = Ext.ComponentQuery.query('module-itemmast2-editor')[0];
		var item_leng = editor.down('[name=item_leng]').getValue();
		var item_widh = editor.down('[name=item_widh]').getValue();
		var item_tick = editor.down('[name=item_tick]').getValue();
		var str = '';

		editor.down('[name=item_spec]').reset();
		console.log((item_tick != ''));
		if(item_tick != null){
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
		if(item_leng != null){
			str = str +' '+ item_leng;
		}else{
			str = str +' 0';
		}
		if(item_widh != null){
			str = str +'x'+ item_widh;
		}else{
			str = str +'x0';
		}
		editor.down('[name=item_spec]').setValue(str);
	},
	calcul2:function(){
		var editor = Ext.ComponentQuery.query('module-itemmast2-editor')[0];
		var item_leng, item_widh, item_tick;
		var str = '';
		var acct_bacd = editor.down('[name=acct_bacd]').getValue();

		if(acct_bacd == '1001'){
			item_leng = editor.down('[name=item_leng]').getValue();
			item_widh = editor.down('[name=item_widh]').getValue();
			item_tick = editor.down('[name=item_tick]').getValue();
			spgr_valu2 = editor.down('[name=spgr_valu2]').getValue();
			if(spgr_valu2 > 0 && item_leng > 0 && item_widh > 0 && item_tick > 0 ){

				item_leng = editor.down('[name=item_leng]').getValue();
				item_widh = editor.down('[name=item_widh]').getValue();
				item_tick = editor.down('[name=item_tick]').getValue();
				spgr_valu2 = editor.down('[name=spgr_valu2]').getValue();

				if(item_leng > 0 && item_widh > 0 && item_tick > 0 && spgr_valu2 > 0){
					wight = (item_leng * item_widh * item_tick * spgr_valu2)/1000000;
					editor.down('[name=unit_wigt]').setValue(0);
					editor.down('[name=unit_wigt]').setValue(wight);
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

			editor.down('[name=item_spec]').setValue('');
			editor.down('[name=item_spec]').setValue(str);
		}else {
			item_leng = Number(editor.down('[name=item_leng]').getValue());
			item_widh = Number(editor.down('[name=item_widh]').getValue());

			str = String(item_leng)+'*'+String(item_widh);

			editor.down('[name=item_spec]').setValue('');
			editor.down('[name=item_spec]').setValue(str);
		}
	},
});