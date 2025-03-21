Ext.define('module.eis.project.eisreport.view.EisReportSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-komec-eisreport-search',

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
				,margin	: '10 40 0 10'
				,autoScroll: true
				,items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						height:50,
						items: [
							{	fieldLabel	: '조회일자',
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								hideTrigger	: true,
								clearable	: false,
								editable	: false,
								value		: new Date(),
								width		: 310,
								labelWidth	: 120,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},{	xtype		: 'betweenfield',
								fieldLabel	:	'~',
								width		: 220,
								height		: 45,
								labelWidth	: 30,
								name		: 'invc_date2',
								pair		: 'invc_date1',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								value		: new Date(),
								hideTrigger	: true,
								clearable	: false,
								editable	: false,
							},{	fieldLabel	: Language.get('cvic_name','설비'),
								xtype		: 'popupfield',
								name		: 'cvic_name',
								pair		: 'cvic_idcd',
								width		: 290,
								height		: 45,
								labelWidth	: 100,
								readOnly	: true,
								finded		: false,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cvic-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',cvic_kind_dvcd : '1000',tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
							},{	xtype	: 'button',
								text	: '<span style="color:white;">X</span>',
								height	: 45,
								width	: 45,
								cls		: 'button-style',
								listeners:{
									click:function(){
										me.down('[name=cvic_name]').setValue('');
										me.down('[name=cvic_idcd]').setValue('');
									}
								}
							}
						]
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:25px;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 200,
						height		: 50,
						style: 'text-decoration:none;',
						handler:function(){
							clearInterval(window.settime);
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},
	select : function(){
		var me = this
			tpanel	= Ext.ComponentQuery.query('module-eisreport-layout')[0].down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tindex++;
		if(tindex == 4){
			tindex = 0;
		}
			tpanel.setActiveTab(tindex);
	},
	reload : function(param){
		var me = this
			listermaster	= Ext.ComponentQuery.query('module-eisreport-lister-master')[0] ,
			listerdetail	= Ext.ComponentQuery.query('module-eisreport-lister-detail')[0] ,
			listerdetail2	= Ext.ComponentQuery.query('module-eisreport-lister-detail2')[0],
			listerdetail3	= Ext.ComponentQuery.query('module-eisreport-lister-detail3')[0],
			listerdetail4	= Ext.ComponentQuery.query('module-eisreport-lister-detail4')[0],
			listerdetail6	= Ext.ComponentQuery.query('module-eisreport-lister-detail6')[0],
			tpanel			= Ext.ComponentQuery.query('module-eisreport-layout')[0].down('#mainpanel'),
			tindex			= tpanel.items.indexOf(tpanel.getActiveTab()),
			lister1			= undefined,
			lister2			= undefined,
			ordr_dvcd		= undefined
		;
		if(tindex == 0){
			lister1 = listermaster;
			lister2 = listerdetail;
			ordr_dvcd = listerdetail.down('[name=ordr_dvcd]').getValue();
		}else if(tindex == 1){
			if(param == '004'){
				lister1 =  listerdetail4;
			}else{
				lister1 =  listerdetail2;
			}
				lister2 =  listerdetail3;

		}else if(tindex == 2){
			document.getElementById('iframe').contentDocument.location.reload(true);
		}else if(tindex ==3){
			document.getElementById('iframe2').contentDocument.location.reload(true);
		}
		if(tindex != 2 && tindex != 3  ){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id,wkct_idcd : param}) );

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id,wkct_idcd : param,work_ordr_dvcd:ordr_dvcd}) );
		}
	}

});