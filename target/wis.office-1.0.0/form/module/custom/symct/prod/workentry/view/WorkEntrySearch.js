Ext.define('module.custom.symct.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-symct-workentry-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					rslt_rept_yorn	: '1',
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_stnm]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		me.items =[ me.searchBasic(wkctLookup)];
		me.callParent();
		var lister = Ext.ComponentQuery.query('module-symct-workentry-lister')[0];
		var detail = Ext.ComponentQuery.query('module-symct-workentry-detail')[0];
		var detail2 = Ext.ComponentQuery.query('module-symct-workentry-detail2')[0];
		var work_date = Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd");
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id,work_date:work_date}) );
		mask.hide();
	},

	searchBasic : function(wkctLookup){
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
					{
						xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '근무일자',
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 300,
								height		: 50,
								maxWidth	: 550,
								labelWidth	: 100,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						lookupValue	: wkctLookup,
						name		: 'wkct_name',
						value		: Ext.util.Cookies.get('wckt_idcd'),
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						multiSelect	: false ,
						editable	: false,
						width		: 300,
						height		: 50,
						maxWidth	: 500,
						labelWidth	: 60,
						listeners	: {
							change	: function (field,value) {
								Ext.util.Cookies.set('wckt_idcd', value);
							}
						},
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('','프로젝트코드'),
						xtype		: 'popupfield',
						name		: 'pjod_idcd',
						width		: 420,
						height		: 50,
						maxWidth	: 600,
						labelWidth	: 170,
						margin		: '0 0 0 40',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						style		: 'text-align:center',
						enableKeyEvents : true,
						editable	: true,
						clearable	: true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-pjod-popup',
							title  : '프로젝트코드 찾기',
							style  : 'font-size:3em !important;height:50px;line-height:50px;',
							params : { stor_grp : _global.stor_grp , line_stat : '0',work_ordr_dvcd : '' , tema: 'tema'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('pjod_idcd'));
							}
						},
						listeners	: {
							change : function(self, e) {
									var value = self.getValue().replace(/\//gi,'-');
									me.pjodIdcd(value);
							},
						},
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:1.5em;">작업일지</span>',
						cls			: 'btn btn-primary',
						width		: 150,
						height		: 40,
						hidden		: true,
						margin		: '3 0 0 50',
						style: 'text-decoration:none; line_height:60px;',
						handler:function(){
							me.datePopup();
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:3em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 200,
						height		: 60,
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
	datePopup:function(){
		var	me			= this,
			form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 60,
				labelStyle: 'text-align:right',
				width		: 280,
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		: '작업일을 선택해주세요.',
					height		: 30,
					cls			: 'textTemp '+_global.options.work_book_tema+'label',
					margin		: '0 0 30 0'
				},{	fieldLabel	: Language.get('defaultdate','작업시작일'),
					xtype		: 'datefield',
					name		: 'invc_date',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					value		: new Date(),
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					labelWidth	: 200,
					width		: 420,
					height		: 45,
				},
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:1.5em">확인</span>',
					width : 100,
					height : 30,
					cls: 'button-style',
					handler: function() {

						var me = this;
						var param = Ext.merge( this.up('form').getValues() );
						if(param.invc_date){
							var jrf		= 'workbook.jrf',
								resId	= _global.hq_id.toUpperCase(),
								arg = 'invc_date~'+param.invc_date+'~';
								url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
								win = window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=950');
								this.up('window').hide();
								return win;
						}else{
							Ext.Msg.alert("알림","작업시작일을 선택해주세요.");
						}
					}
				},
				{	text: '<span class="btnTemp" style="font-size:1.5em">취소</span>',
					cls: 'button-style',
					width : 100,
					height : 30,
					handler: function() {
						this.up('window').hide();
					}
				}
			],
		});
		win = Ext.widget('window', {
			title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업일정작성</span>',
			closeAction: 'hide',
			width: 500,
			height: 200,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},

	pjodIdcd:function(val){
		var search = Ext.ComponentQuery.query('module-symct-workentry-search')[0],
		work_date = search.down('[name=work_date]').getValue(),
		wkct_idcd = search.down('[name=wkct_name]').getValue(),
		pjod_idcd = search.down('[name=pjod_idcd]').getValue(),
		chk	= '',
		arg,
		tpanel = Ext.ComponentQuery.query('module-symct-workentry-layout')[0].down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
	;
		console.log(tindex);
		if(tindex == 0){
			lister = Ext.ComponentQuery.query('module-symct-workentry-lister')[0];
		}else{
			lister = Ext.ComponentQuery.query('module-symct-workentry-detail2')[0];
		}

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}
		}, Ext.merge( {wkct_idcd : wkct_idcd, stor_id : _global.stor_id, work_date:work_date, pjod_idcd: pjod_idcd }) );
	}

});