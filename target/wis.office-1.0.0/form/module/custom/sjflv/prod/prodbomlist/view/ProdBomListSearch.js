Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-prodbomlist-search',
	 initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(),me.createLine1()];

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
				{	xtype	: 'fieldset',
					border	: 3,
					flex	: 1,
					style	: { borderColor	: '#000081', borderStyle	: 'solid' },
					region	: 'center',
					height	: 34,
					margin 	: '3 0 0 0',
					defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
					layout	: 'hbox',
					items	: [
						{	xtype	: 'label',
							fieldCls: 'requiredindex',
							text	: 'SEARCH  | ',
							margin	: '5 10 0 0',
							style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
						},{	name	: 'find_name',
							xtype		: 'searchfield',
							flex		: 4,
							emptyText	: '조회할 주문일자 또는 거래처코드를 입력하세요...',
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var searchButton = self.up('form').down('[action=selectAction]');
										searchButton.fireEvent('click', searchButton); //조회버튼클릭
									}
								}
							}
						}
					]
				},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
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
			xtype			: 'fieldset',
			title			: '상세검색',
			collapsible		: true,
			collapsed		: false,
			layout			: 'vbox',
			defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('acpt_date','수주일자'),
							xtype		: 'betweenfield',
							name		: 'invc1_date',
							pair		: 'invc2_date',
							labelWidth	: 99,
							width		: 198,
							margin		: '0 0 0 2',
							root		: true,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'invc2_date',
							pair		: 'invc1_date',
							labelWidth	: 15,
							width		: 115,
							value		: new Date(),
						},{	fieldLabel	: Language.get('cstm','거래처'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							width		: 250,
							pair		: 'cstm_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listeners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=cstm_idcd]').reset();
									}
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('','수주구분'),
							xtype		: 'lookupfield',
							name		: 'acpt_dvcd',
							width		: 155,
							labelWidth	: 70,
							margin		: '0 0 0 35',
							lookupValue	: resource.lookup('search_all').concat(resource.lookup('acpt_dvcd' )),
							value		: '',
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('deli_date','납기일자'),
							xtype		: 'betweenfield',
							name		: 'deli1_date',
							pair		: 'deli2_date',
							labelWidth	: 99,
							width		: 198,
							margin		: '0 0 0 2',
							root		: true,
							value		:''
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'deli2_date',
							pair		: 'deli1_date',
							labelWidth	: 15,
							width		: 115,
							value		:''
						},{	fieldLabel	: Language.get('item','품목'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'item_name',
							width		: 250,
							pair		: 'item_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-item-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
						},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: '품목분류'	,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 650,
							name		: 'clss_desc',
							pair		: '',
							margin		: '0 0 0 5',
							clearable	: true ,
							hidden		: (_global.hq_id.toUpperCase()=='N1000NBOLT'),
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-clss-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_desc'));
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								}
							},
							listeners	: {
								change	: function(){
									var val = this.getValue();
									if( val == '' || val == null ){
										me.down('[name=lcls_idcd]').reset();
										me.down('[name=mcls_idcd]').reset();
										me.down('[name=scls_idcd]').reset();
									}
								}
							},
							hidden : true
						},{	name	: 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name	: 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name	: 'scls_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
	return line;
	}
});