Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-work-popup',
	alias	: 'widget.lookup-work-popup',
	store	: 'lookup.custom.iypkg.eis.eisreport.store.EisReportPopup',

	title	: '상세조회',
	closable: true,
	autoShow: true,
	closeAction	: 'destroy',
	layout		: 'fit',
	maximized	: true,
	resizable	: true,
	modal		: true,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);

		var idcd = me.popup.params.cvic_idcd,
			name = me.popup.params.cvic_name
		;

		me.down('[name=cvic_name]').setText(name);
		me.selectAction();
	},

	createForm: function(tema){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm() ],
				items		: [ me.createTabs() ]
			}
		;
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			height		: 80,
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '20 0 0 0', width : '25%',
							items	: [
								{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									flex	: 1,
									height	: 45,
									items	: [
										{	text	: '', name : 'cvic_name', xtype : 'label', style : 'text-align:right; font-size : 3em !important;', margin : '7 0 0 10',
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									flex	: 1,
									height	: 45,
									items	: [
										{	text	: '기 상세보기', xtype : 'label', style : 'text-align:left; font-size : 3em !important;', margin : '7 0 0 0',
										}
									]
								}
							]
						},{	xtype	: 'fieldset',
							layout	: 'hbox',
							border	: 0,
							width	: 450,
							flex	: 4,
							margin	: '13 0 0 10',
							items	: [
								{	fieldLabel	: '조회일자',
									xtype		: 'betweenfield',
									name		: 'invc_date1',
									pair		: 'invc_date2',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date()),
									editable	: false,
									hideTrigger	: true,
									clearable	: false,
									width		: 315,
									labelWidth	: 110,
									margin		: '10 0 0 0',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									height		: 45,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									style		: 'text-align:center',
								},{	fieldLabel	: '~',
									xtype		: 'betweenfield',
									name		: 'invc_date2',
									pair		: 'invc_date1',
									value		: new Date(),
									editable	: false,
									hideTrigger	: true,
									clearable	: false,
									width		: 220,
									margin		: '10 0 0 0',
									labelWidth	: 15,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									height		: 45,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									style		: 'text-align:center',
								},{	xtype	: 'button',
									text	: '<span class="btnTemp" style="font-size:2.5em;">조회</span>',
									cls		: 'btn btn-primary',
									margin	: '10 0 0 10',
									withd	: 120,
									handler	: function(){
										me.selectAction();
									}
								},{	buttonAlign	: 'right',
									xtype		: 'button',
									text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
									cls			: 'button-right btn btn-danger',
									width		: 135,
									height		: 45,
									margin		: '10 0 0 0',
									style: 'text-decoration:none;',
									handler:function(){
										me.close();
									}
								}
							]
						}
					]
				}
			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},

	createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				split		: true,
				itemId		: 'grid1',
				flex		: 3.5,
				border		: 1,
				height		: '100%',
				viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
					getRowClass:function(){
						return _global.options.work_book_tema+"cell";
					}
				},
				cls			: _global.options.work_book_tema+'grid',
				selModel: {	selType: 'checkboxmodel', mode : 'MULTI' },
				store	: Ext.create('module.custom.iypkg.eis.eisreport.store.EisReportPopup'),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 50,
							margin	: '3 0 3 0',
							items	: [
							]
						},'-',
						'->' ,
					]
				},
				tbar	: [
					{	height	: 50,
						flex	: 1,
						xtype	: 'panel',
						border	: 0,
						style	: 'text-align:center;background-color: skyblue;',
						items	: [
							{	xtype	: 'label',
								text	: '작업 지시 현황',
								style	: 'font-size:3em !important;'
							}
						]
					}
				],
				columns: [
					{	dataIndex:	'prog_stat_dvcd'	, width:  80, align : 'center' , text: Language.get( 'prog_stat_dvcd' , '상태'	) , xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), hidden : true
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'   , text: Language.get( 'cstm_name'      , '거래처명'	) ,
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'item_name'			, flex :   1, align : 'left'   , text: Language.get( 'item_name'      , '품명'	),
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'indn_qntt'			, width:  85, align : 'right'  , text: Language.get( 'indn_qntt'      , '지시수량'	), xtype : 'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true

					}
				],
			};
		return grid;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				layout	: 'hbox',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createGrid(),me.createGrid2()]
			}
		;
		return tabs;
	},

	createGrid2: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				itemId		: 'grid2',
				header		: false,
				viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
					getRowClass:function(){
						return _global.options.work_book_tema+"cell";
					}
				},
				flex		: 6.5,
				height		: '100%',
				cls			: _global.options.work_book_tema+'grid',
				border		: 1,
				selModel: {	selType: 'checkboxmodel', mode : 'MULTI'  },
				store	: Ext.create('module.custom.iypkg.eis.eisreport.store.EisReportPopup2'),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
					]
				},
				tbar	: [
					{	height	: 50,
						flex	: 1,
						xtype	: 'panel',
						border	: 0,
						style	: 'text-align:center;background-color: skyblue;',
						items	: [
							{	xtype	: 'label',
								text	: '작업 실적 현황',
								style	: 'font-size:3em !important;'
							}
						]
					}
				],
				columns: [
					{	dataIndex:	'cstm_name'		, width: 130, align : 'left'   , text: Language.get( 'cstm_name'      , '거래처명'	) ,
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'item_name'		, flex :   1, align : 'left'   , text: Language.get( 'item_name'      , '품명'	),
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'prod_qntt'		, width:  80, align : 'right'  , text: Language.get( 'prod_qntt'      , '생산수량'	), xtype : 'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'indn_qntt'		, width:  80, align : 'right'  , text: Language.get( 'indn_qntt'      , '지시수량'	), xtype : 'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'work_strt_dttm', width: 158, align : 'left'   , text: Language.get( 'work_strt_dttm' , '시작시간'	),
						renderer: function(value, meta){
							meta.style = 'font-size:1.3em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'work_endd_dttm', width: 158, align : 'left'   , text: Language.get( 'work_endd_dttm' , '종료시간'	),
						renderer: function(value, meta){
							meta.style = 'font-size:1.3em !important; height:36px; line-height:33px;';
							return value;
						},
					},{	dataIndex:	'item_idcd'		, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true
					},{	dataIndex:	'work_numb'		, width:  80, align : 'left'   , text: Language.get( 'work_numb'      , '작업번호'	), hidden : true
					},{ sortable	: false,
						width		: 100,
						align		: 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
								if(rec.data.sum_poor_qntt > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.6em;font-weight: bold;">불량</span>',
											width	: 80,
											height	: 33,
											cls		:'btn btn-danger btnTemp '+_global.options.work_book_tema+'button',
											handler	: function(){
												var work_numb = rec.data.work_numb
												me.popupAction(work_numb);
											}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span class="btnTemp" style="font-size:1.6em;font-weight: bold;">불량</span>',
											width	: 80,
											height	: 33,
											cls:'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
											handler	: function(){
												var work_numb = rec.data.work_numb
												me.popupAction(work_numb);
											}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							},
						dataIndex: 'somefieldofyourstore'
					}
				],
			};
		return grid;
	},


	selectAction: function(){
		var me = this,
			store = me.down('grid').getStore(),
			store2= me.down('#grid2').getStore(),
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id})
		;

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
			}
		});

		store2.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
			}
		});
	},

	popupAction : function(work_numb){
		console.log(work_numb);

		resource.loadPopup({
			widget	: 'lookup-poor-popup',
			params	: {invc_numb : work_numb},
		});
	}

});
