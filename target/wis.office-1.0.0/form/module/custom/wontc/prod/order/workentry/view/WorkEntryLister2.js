Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryLister2', { extend: 'Axt.grid.Panel',
	id			: 'module-wontc-workentry-lister2',
	alias		: 'widget.module-wontc-workentry-lister2',
	store		: 'module.custom.wontc.prod.order.workentry.store.WorkEntryLister2',

	width		: 515,
	minWidth	: 200,
	split		: true,
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(record){
			if(record.get('wkct') == 'wkct_idcd' || record.get('wkct') == 'wkct_name' || record.get('wkct') == 'wkct_code'){
				return "hideCls";
			}else{
				return _global.options.work_book_tema+"cell";
			}
		},
	},

	initComponent: function (config) {
		var me = this;
		me.columns	= me.columnItem();
		me.callParent(arguments);
	},

	listeners:{
		render : function(){
			var me = this;
			setTimeout(function() {
				me.select({
					callback:function(records, operation, success) {
					if (success) {
					} else {}
					}
				}, Ext.merge( {stor_id : _global.stor_id, invc_numb : null}) );
			}, 100);
		},
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:2.5em !important;'},
				items : [
					{	dataIndex: 'wkct'		, flex : 1.5, align : 'center'	, text: Language.get(''		, '공정'		),
						renderer: function(value, meta){
							meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex: 'wkct_11'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_11]').setText(record.get('wkct_11'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_12'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_12]').setText(record.get('wkct_12'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_13'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_13]').setText(record.get('wkct_13'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_14'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_14]').setText(record.get('wkct_14'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_15'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_15]').setText(record.get('wkct_15'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_16'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_16]').setText(record.get('wkct_16'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_17'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_17]').setText(record.get('wkct_17'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_18'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_18]').setText(record.get('wkct_18'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_19'		, flex :  1, align : 'center'	,
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_19]').setText(record.get('wkct_19'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					},{	dataIndex: 'wkct_20'		, flex :  1, align : 'center'	, name : 'wkct_20', id : 'wkct_20',
						renderer: function(value, meta,record){
							if(record.get('wkct') == 'wkct_name'){
								me.down('[dataIndex=wkct_20]').setText(record.get('wkct_20'));
							}
							if(record.get('wkct') == '작업보고'){
								var id = Ext.id(),
									wkct_idcd = value
								;
								if(wkct_idcd != ''){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.4em;font-weight: bold;">보 고</span>',
											cls		: 'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											width	: 70,
											height	: 29,
											handler: function(){me.popup(wkct_idcd)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}else if(record.get('wkct') == '작업일시'){
								if(value =='' || value ==null){
									return null;
								}else{
									meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
									return value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12);
								}
							}else{
								meta.style = 'font-size:1.6em !important; height:36px; line-height:33px;';
								return value;
							}
						}
					}
				]
			};
		return item;
	},

	popup : function (wkct_idcd) {
		var editor = Ext.ComponentQuery.query('module-wontc-workentry-editor')[0],
			search = Ext.ComponentQuery.query('module-wontc-workentry-search')[0],
			date   = new Date(),
			me     = this,
			wkct_code
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					wkct_idcd : wkct_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					wkct_code = result.records[0].wkct_code;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		var	form = Ext.widget('form', {
			id	: 'form2',
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 150,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '10 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '0 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('cstm_name','수주처'),
									name		: 'cstm_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: editor.down('[name=cstm_name]').getValue()
								},{ xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('modl_name','모델명'),
									name		: 'modl_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: editor.down('[name=modl_name]').getValue()
								},{	fieldLabel	: Language.get('invc_qntt','수주량'),
									name		: 'invc_qntt',
									xtype		: 'numericfield',
									width		: 315,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: editor.down('[name=acpt_qntt]').getValue()
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '20 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('drwg_numb','도면번호'),
									name		: 'drwg_numb',
									xtype		: 'textfield',
									margin		: '0 0 0 0',
									width		: 360,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 40px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: editor.down('[name=drwg_numb]').getValue()
								},{	name		: 'revs_numb',
									xtype		: 'textfield',
									margin		: '0 0 0 5',
									width		: 150,
									height		: 45,
									readOnly	: true,
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									value		: editor.down('[name=revs_numb]').getValue()
								}
							]
						},{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '3 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('item_name','품명'),
									name		: 'item_name',
									xtype		: 'textfield',
									width		: 515,
									height		: 45,
									readOnly	: true,
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									value		: editor.down('[name=item_name]').getValue()
								},{	fieldLabel	: Language.get('indn_qntt','지시수량'),
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									width		: 315,
									height		: 45,
									readOnly	: true,
									fieldCls	: 'requiredindex',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '20 0 0 0', hidden : true,
							items	: [
								{	fieldLabel	: Language.get('invc_date','invoice일자'),
									name		: 'invc_date',
									xtype		: 'datefield',
									hidden		: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date(),
									hidden		: true,
								},{	fieldLabel	: Language.get('strt_date','시작일시'),
									name		: 'strt_date',
									xtype		: 'datefield',
									value		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									hidden		: true,
									readOnly	: false,
									maxValue	: new Date(),
									value		: window._stdt.get(editor.down('[name=pror_numb]').getValue()),
									width		: 275,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									margin		: '2 40 2 0',
									listeners	: {
										change	:function(field,val){
											form.down('[name=endd_date]').setMinValue(val);
										}
									}
								},{	fieldLabel	: Language.get('',''),
									name		: 'strt_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									hidden		: true,
									minValue	: '00:00 AM',
									maxValue	: '23:59 PM',
									margin		: '2 40 2 30',
									value		: window._stdt.get(editor.down('[name=pror_numb]').getValue()),
									width		: 100,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'trigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									listConfig:{
										itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0,
							items	: [
								{	fieldLabel	: Language.get('endd_date','종료일시'),
									name		: 'endd_date',
									xtype		: 'datefield',
									value		: '',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									readOnly	: false,
									width		: 275,
									hidden		: true,
									minValue	: new Date(),
									value		: new Date(),
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									labelWidth	: 90,
									margin		: '2 40 2 0'
								},{	fieldLabel	: Language.get('',''),
									name		: 'endd_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									hidden		: true,
									minValue	: '00:00 AM',
									maxValue	: '23:59 PM',
									margin		: '2 40 0 30',
									value		: '18:00',
									width		: 100,
									height		: 45,
									trigger1Cls : _global.options.work_book_tema+'trigger',
									labelStyle	: 'font-size:1.7em; line-height: 45px;',
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									listConfig:{
										itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' , border: 0, margin : '3 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'vbox' , border: 0, margin : '0 0 0 0', padding : 0,
									items	: [
										{	fieldLabel	: Language.get('poor_qntt','불량수량'),
											name		: 'poor_qntt',
											xtype		: 'popupfield',
											width		: 333,
											height		: 45,
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											trigger1Cls : 'hideCls trigger1',
											handleMouseEvents:true,
											listeners:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger1')[0];
														Ext.get(trigger1).dom.click();
													});
												}
											},
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-wontc-poor-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].qntt);
												}
											}
										},{	fieldLabel	: Language.get('good_qntt','양품수량'),
											name		: 'good_qntt',
											xtype		: 'popupfield',
											width		: 333,
											height		: 45,
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											trigger1Cls : 'hideCls trigger2',
											handleMouseEvents:true,
											listeners:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger2')[0];
														Ext.get(trigger1).dom.click();
													});
												}
											},
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].result);
												}
											},
										},{	fieldLabel	: Language.get('user_name','작업자'),
											width		: 275,
											height		: 45,
											value		: '',
											readOnly	: false,
											labelStyle	: 'font-size:1.7em; line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
											labelWidth	: 90,
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'user_name',
											pair		: 'wker_idcd',
											trigger1Cls : _global.options.work_book_tema+'searchTrigger',
											clearable	: false ,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-wkct-popup',
												params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema, find : wkct_code },
												result	: function(records, nameField, pairField) {
													resource.loadPopup({
														widget : 'lookup-user-popup',
														params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema, wkct_idcd : records[0].get('wkct_idcd')},
														result	: function(records) {
															form.down('[name=user_name]').setValue(records[0].get('user_name'));
															form.down('[name=wker_idcd]').setValue(records[0].get('user_idcd'));
														}
													});
												}
											}
										},{	name		: 'wker_idcd', xtype : 'textfield' , hidden : true
										},{	name		: 'wkod_numb', xtype : 'textfield' , hidden : true
										},{	name		: 'wkod_seqn', xtype : 'textfield' , hidden : true
										},{	name		: 'chk_prog', xtype : 'textfield' , hidden : true
										},{	name		: 'new_invc_numb', xtype : 'textfield' , hidden : true,
											listeners : {
												change : function(){
													form.down('[name=poor_qntt]').popup.params = { stor_grp : _global.stor_grp, new_invc_numb : this.value };
												}
											}
										}
									]
								},{	text : '<span class="btnTemp" style="font-size:2em; font-weight:bold;">자재투입</span>'  ,
									xtype	: 'button',
									cls		: 'button-left btn btn-primary',
									width	: 180,
									height	: 135,
									margin	: '5 0 0 10',
									handler	: function(){
										var form = Ext.getCmp('module-wontc-workentry-lister2');
										form.workmtrl(wkct_idcd);
									}
								}
							]
						}
					]
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">재작업</span>',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					style	: 'background-color: red important;',
					handler	: function(){
						var form = Ext.getCmp('module-wontc-workentry-lister2');
						form.commit(wkct_idcd, 4);
					}
				},{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">완료</span>',
					itemId	: 'ok',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					handler	: function(){
						var form = Ext.getCmp('module-wontc-workentry-lister2');
						form.commit(wkct_idcd, 2);
					}
				},{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">중단</span>',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					handler: function() {
						var form = Ext.getCmp('module-wontc-workentry-lister2');
						form.commit(wkct_idcd, 3);
					}
				},{	text	: '<span class="btnTemp" style="font-size:2em; font-weight:bold;">취소</span>',
					cls		: 'button-style',
					width	: 100,
					height	: 50,
					handler: function() {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/wontc/prod/order/workentry/set/poordelete2.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb : this.up('form').down('[name=new_invc_numb]').getValue(),
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});

						this.up('form').getForm().reset();
						form.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">작업보고</span>',
			closeAction: 'close',
			width: 600,
			height: 620,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		var pror_numb = editor.down('[name=pror_numb]').getValue();
		var date1 = window._stdt.get(editor.down('[name=pror_numb]').getValue());

		if(pror_numb=='' || pror_numb==null){
			Ext.Msg.alert("알림", "작업내역을 먼저 조회해주십시오.");
			return;
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'work_book'
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
						form.down('[name=new_invc_numb]').setValue(result.records[0].seq);
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/wontc/prod/order/workentry/get/work.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						invc_numb	: editor.down('[name=pror_numb]').getValue(),
						wkct_idcd	: wkct_idcd
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
						if(result.records.length > 0){
							var	rec = result.records[0];
							var	strt_date = rec.strt_date,
								strt_time = rec.strt_time,
								endd_date = rec.endd_date,
								endd_time = rec.endd_time
							;
							if(rec.wkfw_seqn == '0'){
								Ext.Msg.alert("알림", "작업보고를 할 수 없는 공정입니다.");
								return;
							}
							if(!strt_date){
								strt_date = Ext.Date.format(date1,'Y-m-d');
							}
							if(!strt_time){
								strt_time = Ext.Date.format(date1,'H:i');
							}
							if(!endd_date){
								endd_date = Ext.Date.format(new Date(),'Y-m-d');
							}
							if(!endd_time){
								endd_time = Ext.Date.format(new Date(),'H:i');
							}
							form.down('[name=indn_qntt]').setValue(rec.indn_qntt);
							form.down('[name=good_qntt]').setValue(rec.good_qntt);
							form.down('[name=poor_qntt]').setValue(rec.poor_qntt);
							form.down('[name=wkod_numb]').setValue(rec.invc_numb);
							form.down('[name=wkod_seqn]').setValue(rec.line_seqn);
							form.down('[name=strt_date]').setValue(strt_date);
							form.down('[name=strt_time]').setValue(strt_time);
							form.down('[name=endd_date]').setValue(endd_date);
							form.down('[name=endd_time]').setValue(endd_time);
							form.down('[name=chk_prog]').setValue(rec.chk_prog);

							win.show();
							win.tools.close.hide ();
						}else{
							Ext.Msg.alert("알림", "작업보고를 할 수 없는 공정입니다.");
							return;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},

//	complete : function(wkct_idcd, dvcd){
//		var	form = Ext.widget('form', {
//			border: false,
//			bodyPadding: 10,
//			fieldDefaults: {
//				labelWidth: 200,
//				labelStyle: 'text-align:right',
//				labelSeparator : '',
//			},
//			items:[
//				{	xtype		: 'label',
//					text		: '제작완료시 해당 공정은 더이상 작업보고 할 수 없습니다. 제작완료 하시겠습니까?',
//					cls			: 'textTemp',
//					style	: 'font-size:2.2em;'
//				}
//			],
//			buttons: [
//				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
//					cls: 'button-style',
//					flex:1,
//					height:50,
//					handler: function() {
//						var form = Ext.getCmp('module-wontc-workentry-lister');
//						form.commit(wkct_idcd, 1);
//						this.up('window').destroy();
//					}
//				},
//				{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
//					cls: 'button-style',
//					flex:1,
//					height:50,
//					handler: function() {
//						this.up('form').getForm().reset();
//						this.up('window').destroy();
//					}
//				}
//			]
//		});
//		win = Ext.widget('window', {
//			title: '<span class="btnTemp" style="font-size:15px; color:black;">제작완료</span>',
//			closeAction: 'close',
//			width: 450,
//			height: 200,
//			layout: 'fit',
//			resizable: true,
//			modal: true,
//			items: form,
//			defaultFocus: ''
//		});
//		win.show();
//		win.tools.close.hide ();
//	},

	commit : function(wkct_idcd, dvcd){
		var me = this,
			lister = Ext.ComponentQuery.query('module-wontc-workentry-lister')[0],
			lister2= Ext.ComponentQuery.query('module-wontc-workentry-lister2')[0],
			editor = Ext.ComponentQuery.query('module-wontc-workentry-editor')[0],
			form   = Ext.getCmp('form2'),
			store  = me.getStore(),
			good_qntt, poor_qntt,invc_date,wker_idcd,prog_stat_dvcd,
			date1 = window._stdt.get(editor.down('[name=pror_numb]').getValue())
		;
		if(dvcd == '1'){		//제작완료 (현재 hidden)
			prog_stat_dvcd = '3';
		}else if(dvcd == '2'){
			prog_stat_dvcd = '3';
		}else if(dvcd == '3'){
			prog_stat_dvcd = '2';
		}
		wker_idcd = form.down('[name=wker_idcd]').getValue();
		good_qntt = form.down('[name=good_qntt]').getValue();
		poor_qntt = form.down('[name=poor_qntt]').getValue();
		invc_date = Ext.Date.format(new Date(),'Ymd');
		strt_date = Ext.Date.format(date1,'Ymd');
		strt_time = Ext.Date.format(date1,'Hi');
		endd_date = Ext.Date.format(new Date(),'Ymd');
		endd_time = Ext.Date.format(new Date(),'Hi');
		work_strt_dttm = strt_date+''+strt_time;
		work_endd_dttm = endd_date+''+endd_time;

		chk_prog = form.down('[name=chk_prog]').getValue();
		if(chk_prog >= 1){
			if(dvcd=='2' || dvcd =='3'){
				return;
			}
		}else{
			if(dvcd=='4'){
				return;
			}
		}

		if(poor_qntt == '' || poor_qntt == null){
			poor_qntt = 0;
		}
		if(good_qntt == '' || good_qntt == null){
			good_qntt = 0;
		}

		if(poor_qntt<=0 && good_qntt<=0){
			Ext.Msg.alert("알림", "수량을 입력해주십시오.");
			return;
		}else if(wker_idcd == '' || wker_idcd == null){
			Ext.Msg.alert("알림", "작업자를 입력해주십시오.");
			return;
		}else if(date1 == undefined){
			Ext.Msg.alert("알림", "작업일시 입력을 위해 바코드를 스캔하여주십시오.");
			form.getForm().reset();
			form.up('window').destroy();
			return;
		}else{
			record = Ext.create( store.model.modelName , {
				new_invc_numb	: form.down('[name=new_invc_numb]').getValue(),
				invc_date		: invc_date,
				work_strt_dttm	: work_strt_dttm,
				work_endd_dttm	: work_endd_dttm,
				wkct_idcd		: wkct_idcd,
				cstm_idcd		: editor.down('[name=cstm_idcd]').getValue(),
				item_idcd		: editor.down('[name=item_idcd]').getValue(),
				wkod_numb		: form.down('[name=wkod_numb]').getValue(),
				wkod_seqn		: form.down('[name=wkod_seqn]').getValue(),
				indn_qntt		: form.down('[name=indn_qntt]').getValue(),
				good_qntt		: good_qntt,
				poor_qntt		: poor_qntt,
				wker_idcd		: wker_idcd,
				prog_stat_dvcd	: prog_stat_dvcd,
			});
			store.add(record);
			store.sync({
				callback: function(batch, options) {
					form.getForm().reset();
					form.up('window').destroy();
					lister.getStore().reload();
					lister2.getStore().reload();

					//시간 지우기
					window._stdt.removeAtKey(editor.down('[name=pror_numb]').getValue());
				}
			},{	_set : 'insert'} );
		}
	},

	workmtrl : function(wkct_idcd){
		var me = this,
			editor = Ext.ComponentQuery.query('module-wontc-workentry-editor')[0],
			invc_numb = editor.down('[name=pror_numb]').getValue(),
			item_idcd = editor.down('[name=item_idcd]').getValue()
		;
		var a = resource.loadPopup({
			widget : 'module-hjsys-workenty-mtrl-popup',
			params	: {
				wkct_idcd	: wkct_idcd
			},
		});
	},
});
