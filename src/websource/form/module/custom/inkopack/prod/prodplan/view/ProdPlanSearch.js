Ext.define('module.custom.inkopack.prod.prodplan.view.ProdPlanSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prodplan-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic(),me.createLine1(), me.createLine2()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin : '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText	: '조회할 품목코드 또는 품명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
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
			}
		;
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				layout	: 'hbox',
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'lookupfield',
						name		: 'date',
						editable	: false,
						width		: 140,
						margin		: '0 0 0 5',
						lookupValue	: [['1','시작일자'],/*['2','발주일자'],*/['3','납기일자']],
						value		: '1'
					},{	xtype		: 'betweenfield',
						name		: 'fr_dt',
						pair		: 'to_dt',
						width		: 100,
						margin		: '0 0 0 2',
						root		: true,
						value		: ''
					},{	xtype		: 'betweenfield',
						fieldLabel	:'~',
						name		: 'to_dt',
						pair		: 'fr_dt',
						labelWidth	: 15,
						width		: 115,
						value		: ''
					},{	fieldLabel	: Language.get('wkct_name','공정'),
						xtype		: 'popupfield', editable : true, enableKeyEvents : true,
						name 		: 'wkct_name',
						pair 		: 'wkct_idcd',
						margin		: '0 0 0 2',
						width		: 215  ,
						clearable	: true ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-wkct-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0'},
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
						listeners:{
							change:function(self, e){
								me.down('[name=cvic_name]').popup.params = { wkct_idcd : this.getValue(), stor_grp : _global.stor_grp , line_stat : '0'}
								if(e == '' || e == null){
									me.down('[name=cvic_name]').reset();
									me.down('[name=cvic_idcd]').reset();
								}
							}
						}
					},{	fieldLabel	: Language.get('cvic_name','설비'),
						xtype		: 'popupfield', editable : true, enableKeyEvents : true,
						name 		: 'cvic_name',
						pair 		: 'cvic_idcd',
						margin		: '0 0 0 2',
						clearable	: true ,
						width		: 215,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cvic-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0'},
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('prog_stat_dvcd', '진행상태구분'),
						labelWidth	: 125,
						width		: 230,
						xtype		: 'lookupfield',
						name		: 'prog_stat_dvcd',
						multiSelect	: false ,
						clearable	: true ,
						editable	: false,
						lookupValue	: resource.lookup('search_all').concat(resource.lookup('prog_stat_dvcd' )),
					},{	fieldLabel	: Language.get('ordr_dvcd', '주문상태'),
						labelWidth	: 90,
						width		: 210,
						xtype		: 'lookupfield',
						name		: 'ordr_dvcd',
						multiSelect	: false ,
						editable	: false,
						lookupValue	: resource.lookup('search_all').concat(resource.lookup('ordr_dvcd' )),
						hidden		: true
					}
				]
			};
		return line;
	},

	createLine2 : function(){
		var me = this,
			line =
				{	xtype : 'fieldset',
					layout: 'hbox',
					margin	: '3 40 0 40',
					items : [
//						{	xtype		: 'lookupfield',
//							name		: 'search_id',
//							editable	: false,
//							width		: 100,
//							margin		: '0 0 0 5',
//							lookupValue	: [['1','수주번호'],['2','고객명'],['3','고객 전화번호'],['4','요청 메모']],
//							value		: '1'
//						},{	name		: 'search_name' ,
//							xtype		: 'searchfield' ,
//							width		: 255  ,
//							margin		: '0 0 0 2',
//							clearable	: true,
//							readOnly	: false ,
//							allowBlank	: true,
//							emptyText	: Const.infoNull.queryAll//,
//						}
						{	fieldLabel	: Language.get('item_name','품목'),
							xtype		: 'popupfield', editable : true, enableKeyEvents : true,
							labelWidth	: 30,
							width		: 362,
							name		: 'item_name',
							pair		: 'item_idcd',
							clearable	: true ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
						},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
						},{	name		: 'cstm_lott_numb' ,
							xtype		: 'searchfield' ,
							fieldLabel	: 'LOT 번호',
							width		: 215  ,
							labelWidth	: 70,
							margin		: '0 0 0 2',
							clearable	: true,
							readOnly	: false ,
							allowBlank	: true,
							emptyText	: Const.infoNull.queryAll
						},{	fieldLabel	: Language.get('cstm', '고객' ),
							width		: 217  ,
							labelWidth	: 72,
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							xtype		: 'popupfield', editable : true, enableKeyEvents : true,
							emptyText	: Const.infoNull.queryAll,
							clearable	: true,
							popup 		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_id : _global.stor_id },
								result	: function(records, nameField, pairField ){
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype : 'textfield',  name : 'cstm_idcd' , hidden: true
						},{	xtype		: 'checkbox',
							boxLabel	: '추가생산',
							name		: 'add',
							checked		: false,
							style		: { color : 'blue' },
							margin		: '0 0 0 65'
						},{	fieldLabel	: Language.get('line_clos','마감상태'),
							xtype		: 'lookupfield',
							name		: 'line_clos',
							editable	: true,
							labelWidth	: 40,
							width		: 106,
							lookupValue	: [['','전체'],['1','마감'],['2','정상']],
							value		: ''
						}
					]
				};
		return line;
	}
});