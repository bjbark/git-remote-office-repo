Ext.define('module.membership.basic.memberlist.view.MemberListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-memberlist-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 회원코드 또는 회원명 , 전화번호를 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype		: 'fieldset'	,
				title		: '상세검색',
				layout		: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr_name','회원명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								clearable	: true,
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-member-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mmbr_name'));
										pairField.setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_idcd]').setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_name]').setValue(records[0].get('mmbr_name'));
									}
								}
							},{	name		: 'mmbr_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: '담당코치',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								allowBlank	: true,
								clearable	: false ,
								width		: 160,
								labelWidth	: 60,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('mmbr_stat_dvcd','등록상태'),
								xtype		: 'lookupfield',
								name		: 'mmbr_stat_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('mmbr_stat_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('entr_term','등록기간'),
								xtype		: 'betweenfield',
								name		: 'entr_fr_dt',
								pair		: 'entr_to_dt',
								labelWidth	: 60,
								width		: 160,
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'entr_to_dt',
								pair		: 'entr_fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('hdph_numb','전화번호'),
								name	: 'hdph_numb',
								xtype	: 'searchfield',
								width	: 200,
								emptyText		: '전화번호를 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									},
								}
							},{	fieldLabel	: Language.get('enps_dvcd','가입경로'),
								xtype		: 'lookupfield',
								name		: 'enps_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('enps_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('gndr_dvcd','성별'),
								xtype		: 'lookupfield',
								name		: 'gndr_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('gndr_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('brth_term','생일'),
								xtype		: 'betweenfield',
								name		: 'brth_fr_dt',
								pair		: 'brth_to_dt',
								labelWidth	: 60,
								width		: 160,
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'brth_to_dt',
								pair		: 'brth_fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('carr_dvcd','경력'),
								xtype		: 'lookupfield',
								name		: 'carr_dvcd',
								width		: 200,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('carr_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('enpp_dvcd','가입목적'),
								xtype		: 'lookupfield',
								name		: 'enpp_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('enpp_dvcd' )),
								value		: '',
							},{	fieldLabel	: Language.get('lssn_type_dvcd','레슨형태'),
								xtype		: 'lookupfield',
								name		: 'lssn_type_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('lssn_type_dvcd' )),
								value		: '',
							},{	fieldLabel	: Language.get('lssn_ccle_dvcd','레슨주기'),
								xtype		: 'lookupfield',
								name		: 'lssn_ccle_dvcd',
								labelWidth	:  60,
								width		: 160,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('lssn_ccle_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  40,
								width		: 115,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: ''
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '2 0 0 0', hidden : true,
						items	: [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
									{	xtype		: 'checkbox',
										boxLabel	: '월',
										name		: 'mond_yorn',
										labelWidth	: 30,
										width		: 60,
										value		: true,
										margin		: '0 0 0 60',
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '화',
										name		: 'tued_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '수',
										name		: 'wedd_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '목',
										name		: 'thud_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '금',
										name		: 'frid_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '토',
										name		: 'satd_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									},{	xtype		: 'checkbox',
										boxLabel	: '일',
										name		: 'sund_yorn',
										labelWidth	: 20,
										width		: 60,
										value		: true,
										inputValue	: '1',
									}
								]
							}
						]
					}
				]
			};
		return line;
	}

});