Ext.define('module.custom.kortc.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-kortc-workentry-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic()];
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
				,height	: 65
				,margin	: '20 40 0 10'
				,autoScroll: true
				,items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '일자',
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 210,
								maxWidth	: 500,
								value		: new Date(),
								labelWidth	: 47,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
								listeners	: {
									render	: function(){
										var here = this;
										window.today = setInterval(function(){
											here.setValue(new Date());
										}, 5000)
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'popupfield',
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						width		: 300,
						editable	: false,
						clearable	: true,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
						margin		: '0 40 0 0',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp, dept_idcd:'500', tema:_global.options.work_book_tema,find_name : ""},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	xtype:'textfield', name:'wkct_idcd', hidden:true,
						listeners:{
							change:function(cont,val){
								if(val!=""){
									me.searchAct();
								}
							}
						}
					},{	fieldLabel	: Language.get('pror_numb', '지시번호'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'textfield',
						name		: 'invc_numb',
						labelWidth	: 100,
						height		: 45,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == 9) {
									if(self.getValue()!= ""){
										me.searchAct();
									}
								}
							},
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('close', '닫기')+'</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 0',
						style: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},
	searchAct:function(){
		var	me		= this,
			lister	= Ext.ComponentQuery.query('module-kortc-workentry-lister')[0],
			detail	= Ext.ComponentQuery.query('module-kortc-workentry-detail')[0],
			detail2	= Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0],
			value	= me.getValues(),
			tpanel  = Ext.ComponentQuery.query('module-kortc-workentry-layout')[0].down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
		mask.show();
		if(tindex == 0){
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge({	wkct_idcd : value.wkct_idcd,
				work_date : value.work_date,
				stor_id  : _global.stor_id,
			}));
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge({	wkct_idcd : value.wkct_idcd,
							work_date : value.work_date,
							stor_id  : _global.stor_id,
							}));
		}else if(tindex==1){
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge({	wkct_idcd : value.wkct_idcd,
							stor_id  : _global.stor_id,
			}) );
		}
	}
});