Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-prodplan-search',
	 initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(), me.addonSearch()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
						,height	: 34
						,margin : '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout	: 'hbox'
						,items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'     ,
								xtype	: 'searchfield',
								flex	: 4,
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
	
	addonSearch : function(){
		var me = this,
		line = {
			xtype			: 'fieldset',
			title			: '상세검색',
			collapsible		: true,
			collapsed		: false,
			name			: 'collapsed',
			layout			: 'vbox',
			defaults		: { layout: 'hbox', margin : '0 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset',
					items : [
						{	fieldLabel	: Language.get('','수주일자'),
							xtype		: 'betweenfield',
							width		: 198,
							root		: true,
							name		: 'invc_date1',
							pair		: 'invc_date2',
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'invc_date2',
							pair		: 'invc_date1',
							labelWidth	: 15,
							width		: 115,
						},{	xtype		: 'checkbox',
							boxLabel	: '삼정수주',
							name		: 'acpt_dvcd_1000',
							checked		: false,
							margin		: '0 0 0 45'
						},{	xtype		: 'checkbox',
							boxLabel	: 'OEM수주',
							name		: 'acpt_dvcd_2000',
							checked		: false,
							margin		: '0 0 0 45'
						},{	xtype		: 'popupfield',
							fieldLabel	: Language.get('cstm_name','거래처'),
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							width		: 313,
							clearable	: true,
							margin		: '0 0 0 25',
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype	: 'textfield' ,
							name	: 'cstm_idcd', 
							hidden	: true
						},{	xtype		: 'lookupfield',
							name		: 'line_clos',
							width		: 200,
							fieldLabel	:  Language.get('line_clos', '상태'),
							lookupValue	: resource.lookup('line_clos'),
							value		: '0'
						}
					]
				},{	xtype	: 'fieldset',
					items	: [
						{	xtype		: 'betweenfield',
							fieldLabel	: Language.get('deli_date','납기일자'),
							width		: 198,
							root		: true,
							name		: 'deli_date1',
							pair		: 'deli_date2',
							value		: new Date(),
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'deli_date2',
							pair		: 'deli_date1',
							labelWidth	: 15,
							width		: 115,
							value		: new Date(),
						},{	xtype		: 'checkbox',
							boxLabel	: '주문생산',
							name		: 'prod_trst_dvcd_1000',
							checked		: false,
							margin		: '0 0 0 45'
						},{	xtype		: 'checkbox',
							boxLabel	: '재고생산',
							name		: 'prod_trst_dvcd_2000',
							checked		: false,
							margin		: '0 0 0 45'
						},{	xtype		: 'betweenfield',
							fieldLabel	: Language.get('','생산예정일자'),
							margin		: '0 0 0 30',
							width		: 198,
							name		: 'prod_date1',
							pair		: 'prod_date2',
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
							hidden		: true
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'prod_date2',
							pair		: 'prod_date1',
							labelWidth	: 15,
							width		: 115,
							value		: new Date(),
							hidden		: true
						},{	xtype		: 'checkbox',
							boxLabel	: '그룹 적용',
							name		: 'group_apply',
							checked		: false,
							margin		: '0 0 0 100'
						}
					]
				}
			]
		};
		return line;
	}

});