Ext.define('module.custom.symct.prod.workentry.view.WorkEntryListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-symct-workentry-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.symct.prod.workentry.store.WorkEntryDetail2',
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
		me.paging  = me.pagingItem();
		me.columns = me.columnItem(wkctLookup);
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


	columnItem : function (wkctLookup) {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('assi_seqn'		,'순번'			), width: 80   , align : 'center'
					},{	dataIndex: 'wkct_idcd'		, text : Language.get('wkct_name'		,'공정'			), width: 120  , align : 'left', xtype : 'lookupcolumn', lookupValue : wkctLookup
					},{	dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업구분'		), width: 100  , xtype : 'lookupcolumn', lookupValue	: resource.lookup('work_ordr_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'pjod_idcd'		, text : Language.get(''				,'주문번호'		), width: 120  , align : 'center', hidden : true
					},{ dataIndex: 'pjod_idcd'		, text : Language.get(''				,'프로젝트코드'	), width: 120  , align : 'center'
					},{ dataIndex: 'item_idcd'		, text : Language.get('drwg_numb'		,'도면번호'		), width: 220  , align : 'right'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'제품명'		), flex : 2    , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			), flex : 1    , align : 'left', hidden : true
					},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'		,'수주량'		), width: 100  , align : 'right'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산량'		), width: 100  , align : 'right'
					},{ header: '실행',
						sortable: false,
						width:130,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width : 80,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em !important;text-align : center !important;">취소</span>',
										cls:'btn btn-danger btnTemp'+_global.options.work_book_tema+'button',
										handler: function(){me.cancelBtn(rec)}
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

	cancelBtn : function(rec){

		var pjod_idcd = rec.data.pjod_idcd,
			prod_qntt = rec.data.prod_qntt,
			store =  Ext.ComponentQuery.query('module-symct-workentry-detail2')[0].getStore(),
			param =  Ext.ComponentQuery.query('module-symct-workentry-search')[0].getValues(),
			wkct_idcd = param.wkct_name,
			invc_date = param.work_date,
			item_idcd = rec.data.item_idcd,
			line_seqn = rec.data.line_seqn,
			seq,_set,
			prod_qntt = rec.data.prod_qntt,
			acpt_qntt = rec.data.acpt_qntt
		;
		if(!wkct_idcd){
			Ext.Msg.alert("알림", "공정을 선택하여 주시기 바랍니다.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/symct/prod/set/complete.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					pjod_idcd	: pjod_idcd,
					wkct_idcd	: wkct_idcd,
					invc_date	: invc_date,
					line_seqn	: line_seqn,
					prod_qntt	: rec.get('prod_qntt'),
					item_idcd	: item_idcd,
					_set		: 'delete'
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
					store.reload();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	restart : function (rec) {
		var search = Ext.ComponentQuery.query('module-symct-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-symct-workentry-lister')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-symct-workentry-detail2')[0].getStore()
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
		var search = Ext.ComponentQuery.query('module-symct-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-symct-workentry-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-symct-workentry-detail')[0].getStore()
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