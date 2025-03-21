Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtworkentry-detail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail',
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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width:80 , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","진행중"],["2","지연"]], align : 'center'
					},{	dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업구분'		) , width :100  , xtype : 'lookupcolumn', lookupValue	: resource.lookup('work_ordr_dvcd'), align : 'center'
					},{	dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'작업구분'		) , width :150  ,hidden:true
					},{ dataIndex: 'idcd'			, text : Language.get('idcd'			,'지시번호'		) , flex : 2, align : 'center',hidden:true
					},{ dataIndex: 'invc_date'		, text : Language.get('strt_date'		,'시작일'		) , width : 130 ,align:'center'
					},{ dataIndex: 'work_sttm'		, text : Language.get('strt_time'		,'시작시간'		) , width : 110 ,align : 'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'		) , width : 120,align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명'		) , flex : 1
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'작업품명'		) , width : 120
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'공정명'		) , width:100
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex : 2,hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , flex : 2,xtype:'numericcolumn',hidden : true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , flex : 2,align : 'center',hidden:true
					},{ dataIndex: 'user_name'		, text : Language.get('wker_name'		,'작업자'		) , width : 100,
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'		) , flex : 2,hidden:true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , flex : 2,hidden:true
					},{ dataIndex: 'line_seqn2'		, text : Language.get('line_seqn2'		,'순번'		) , flex : 2,hidden:true
					},{ header: '실행',
						width : 300,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec,a,b,c) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:100,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">중단</span>',
										cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
										handler:  function(){me.stop(rec)},
									});
									Ext.widget('button', {
										width:100,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">종료<span>',
										cls:'btn btn-danger btnTemp '+_global.hq_id+'button',
										handler:  function(){me.end(rec)},
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
	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-prjtworkentry-lister')[0].getStore(),
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
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						maxValue	: new Date(),
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
					},{	fieldLabel	: Language.get('work_edtm','중단시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp = rec.get('work_sttm').replace(/:/,''),
								sttm_hour = sttm_temp.substring('0','2');
								edtm_hour = param.work_edtm.substring('0','2');
								sttm_min = sttm_temp.substring('2','4');
								edtm_min = param.work_edtm.substring('2','4');
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							console.log(param.work_date);
							record = Ext.create( store2.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								ordr_degr		: rec.get('ordr_degr'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								work_edtm		: param.work_edtm+'00',
								invc_date		: param.work_date,
								need_time		: total,
								line_seqn2		: rec.get('line_seqn2'),
								work_endd_date	: param.work_date
							});
							store2.add(record);
							store2.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'stop'} );
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">중단</span>',
				closeAction: 'hide',
				width: 650,
				height: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	end : function (rec) {
		var search = Ext.ComponentQuery.query('module-prjtworkentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-prjtworkentry-detail')[0].getStore()
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
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
						maxValue	: new Date(),
					},{	fieldLabel	: Language.get('work_edtm','종료시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp'
					},{ xtype		: 'datefield',
						name		: 'work_endd_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date()
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp = rec.get('work_sttm').replace(/:/,''),
								sttm_hour = sttm_temp.substring('0','2');
								edtm_hour = param.work_edtm.substring('0','2');
								sttm_min = sttm_temp.substring('2','4');
								edtm_min = param.work_edtm.substring('2','4');

							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								work_sttm		: rec.get('work_sttm'),
								ordr_degr		: rec.get('ordr_degr'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								work_edtm		: param.work_edtm+'00',
								invc_date		: param.work_date,
								need_time		: total,
								idcd			: rec.get('idcd'),
								line_seqn2		: rec.get('line_seqn2'),
								work_endd_date	: param.work_date
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
							},{	synchro : _global.objects.synchro,_set : 'end'} );
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
				closeAction: 'hide',
				width: 650,
				height: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},

});