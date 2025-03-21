Ext.define('module.prod.order.workbookv3.view.WorkBookV3ListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv3-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workbookv3.store.WorkBookV3Detail2',
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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width	: 120	, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center',hidden:true
					},{ dataIndex: 'seqn'			, text : Language.get('seqn'			,'순번'		) , width	: 45	, align : 'center'
					},{ dataIndex: 'wkod_seqn'		, text : Language.get('wkod_seqn'		,'지시순번'	) , flex	: 2		, align : 'center'		, hidden:true
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'	) , width	: 90	, align : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'	) , width	: 90	, align : 'center'
					},{ dataIndex: 'wkod_numb'		, text : Language.get('pdsd_numb'		,'작업지시번호') , width	: 200	, align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex	: 1		, minWidth:200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width	: 90	, xtype:'numericcolumn'
					},{ dataIndex: 'acum_qntt'		, text : Language.get('acum_qntt'		,'누적수량'	) , width	: 90	, xtype:'numericcolumn'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker'			,'작업자'		) , width	: 115
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'	) , flex	: 2		, hidden:true
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
		var search = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
//			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv3-lister')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-workbookv3-detail2')[0].getStore()
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
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
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
								indn_qntt		: rec.get('indn_qntt'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								prod_qntt		: rec.get('prod_qntt'),
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
	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
//			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv3-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-workbookv3-detail')[0].getStore()
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
						text		: '취소하시겠습니까?',
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
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
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
								indn_qntt		: rec.get('indn_qntt'),
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