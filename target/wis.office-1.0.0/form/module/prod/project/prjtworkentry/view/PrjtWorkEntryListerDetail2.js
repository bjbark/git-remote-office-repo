Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtworkentry-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail2',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width	:120	, xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","진행중"],["2","지연"],["3","완료"]], align : 'center',hidden:true
					},{ dataIndex: 'idcd'			, text : Language.get('idcd'			,'지시번호'		) , flex	: 2		, align : 'center',hidden:true
					},{	dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업구분'		) , width	: 100	, xtype : 'lookupcolumn', lookupValue	: resource.lookup('work_ordr_dvcd'), align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('strt_date'		,'시작일'		) , width	: 130	, align : 'center',
					},{ dataIndex: 'work_sttm'		, text : Language.get('strt_time'		,'시작시간'		) , width	: 110	, align : 'center',
					},{ dataIndex: 'work_endd_date'	, text : Language.get('work_endd_date'	,'종료일'		) , width	: 130	, align : 'center',
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'		) , width	: 110	, align : 'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'		) , width	: 120
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명'		) , flex	: 1
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업품명'		) , width : 120
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , flex	: 2		, xtype:'numericcolumn',hidden : true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , flex	: 2		, align : 'center',hidden:true
					},{ dataIndex: 'user_name'		, text : Language.get('wker_name'		,'작업자'		) , width	: 100,
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'line_seqn2'		, text : Language.get('line_seqn2'		,'순번'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'순번'		) , flex	: 2		, hidden:true
					},{ header: '실행',
						width : 300,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:120,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">추가작업</span>',
										cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
										handler:  function(){me.restart(rec)},
									});
									Ext.widget('button', {
										width:120,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">취소</span>',
										cls:'btn btn-primary btnTemp '+_global.hq_id+'button',
										handler:  function(){me.cancel(rec)},
									});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	restart : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-prjtworkentry-lister')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-prjtworkentry-detail2')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '추가작업하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								ordr_degr		: rec.get('ordr_degr'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								invc_date		: param.work_date,
								line_seqn2		: rec.get('line_seqn2')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'restart'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">추가작업</span>',
				closeAction: 'hide',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-prjtworkentry-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-prjtworkentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '취소하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								ordr_degr		: rec.get('ordr_degr'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								invc_date		: param.work_date,
								work_edtm		: '',
								need_time		: '',
								line_seqn2		: rec.get('line_seqn2')
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store2.reload();
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'cancel'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'hide',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},

});