Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dhtec-workenty-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.dhtec.prod.workentry.store.WorkEntryDetail2',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
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
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'			) , width	: 120	, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'seqn'			, text : Language.get('seqn'			,'순번'			) , width	: 45	, align : 'center'		, hidden:true
					},{ dataIndex: 'wkod_seqn'		, text : Language.get('wkod_seqn'		,'지시순번'		) , flex	: 2		, align : 'center'		, hidden:true
					},{ dataIndex: 'wkod_numb'		, text : Language.get('ordr_numb'		,'지시번호'		) , width	: 120	, align : 'center'
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작일자'		) , width	: 90	, align : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료일자'		) , width	: 90	, align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width	: 200	, align : 'left'
					},{ dataIndex: ''				, text : Language.get('item_name'		,'수주번호'		) , width	: 120	, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width	: 300	, align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width	: 250	, align : 'left'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt_l'		,'작업수량'		) , width	: 100	, xtype:'numericcolumn'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker'			,'작업자'			) , width	: 115	, align : 'left'
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'		) , flex	: 2		, hidden:true
					},{ header: Language.get('action','실행'),
						width : 330,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:140,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+Language.get('add_work','추가작업')+'</span>',
										cls:'btn btn-warning btnTemp '+_global.options.work_book_tema+'button',
										handler:  function(){me.restart(rec)},
									});
									Ext.widget('button', {
										width:120,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+Language.get('cancel','취소')+'</span>',
										cls:'btn btn-primary btnTemp '+_global.options.work_book_tema+'button',
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
		var search = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
//			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0].getStore()
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
						text		: Language.get('more_work','추가작업하시겠습니까?'),
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('confirm','확인')+'</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: param.invc_date
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
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('add_work','추가작업')+'</span>',
				closeAction: 'hide',
				width: 500,
				height: 240,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
	},
	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
//			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getStore()
		;
		console.log(store2);
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
						text		: Language.get('cancel_work','취소하시겠습니까?'),
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('confirm','확인')+'</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								invc_date		: param.invc_date,
								work_edtm		: '',
								need_time		: ''
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
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('cancel','취소')+'</span>',
				closeAction: 'hide',
				width: 500,
				height: 220,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
	},

});