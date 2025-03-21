Ext.define('module.custom.inkopack.prod.workentry.view.WorkEntryListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.inkopack.prod.workentry.store.WorkEntryDetail2',
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
					{	dataIndex: 'seqn'			, text : Language.get(''			,'순번'		) , width	: 50	, align : 'center'
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get(''			,'상태'		) , width	: 70	, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center',hidden:false
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get(''			,'주/야'		) , width	: 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd'), align : 'center',hidden:false
					},{ dataIndex: 'cvic_name'		, text : Language.get(''			,'설비'		) , width	: 100	, align : 'center'
					},{ dataIndex: 'wkod_seqn'		, text : Language.get(''			,'지시순번'	) , flex	: 2		, align : 'center'		, hidden:true
					},{ dataIndex: 'work_strt'		, text : Language.get(''			,'시작일시'	) , width 	: 100	, align  : 'center'
					},{ dataIndex: 'work_endd'		, text : Language.get(''			,'종료일시'	) , width 	: 100	, align  : 'center'
					},{ dataIndex: 'work_sttm'		, text : Language.get(''			,'시작시간'	) , width	: 75	, align : 'center', hidden:true
					},{ dataIndex: 'work_edtm'		, text : Language.get(''			,'종료시간'	) , width	: 75	, align : 'center', hidden:true
					},{ dataIndex: 'acpt_numb'		, text : Language.get(''			,'수주번호'	) , width	: 160	, hidden : true
					},{ dataIndex: 'lott_numb'		, text : Language.get(''			,'LOT번호'	) , width	: 150
					},{ dataIndex: 'item_code'		, text : Language.get(''			,'품목코드'	) , width	: 120
					},{ dataIndex: 'wkod_numb'		, text : Language.get(''			,'지시번호'	) , width	: 180	, hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get(''			,'품명'	) , flex	: 1		, minWidth:200
					},{ dataIndex: 'item_spec'		, text : Language.get(''			,'규격'		) , flex	: 2		, hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get(''			,'지시수량'	) , width	: 80	, xtype:'numericcolumn'
					},{ dataIndex: 'prod_qntt'		, text : Language.get(''			,'생산수량'	) , width	: 80	, xtype:'numericcolumn'
					},{ dataIndex: 'acum_qntt'		, text : Language.get(''			,'누적수량'	) , width	: 80	, xtype:'numericcolumn'
					},{ dataIndex: 'wker_name'		, text : Language.get(''			,'관리자'	) , width	: 115	, align  : 'center'
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get(''			,'작업시작일'	) , width	: 115	, hidden:true
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get(''			,'작업종료일'	) , width	: 115	, hidden:true
					},{ dataIndex: 'invc_date'		, text : Language.get(''			,'작업일자'	) , flex	: 2		, hidden:true
					},{ header: '실행',
						hidden: true,
						width : 220,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:100,
										height: 40,
										margin: "0 10px 0 0",
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">생산수정</span>',
										cls:'btn btn-warning btnTemp '+_global.options.work_book_tema+'button',
										handler:  function(){me.restart(rec)},
									});
									Ext.widget('button', {
										width:100,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">마감취소</span>',
										cls:'btn btn-danger btnTemp '+_global.options.work_book_tema+'button',
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
			var search = Ext.ComponentQuery.query('module-workentry-search')[0],
				searchDate = search.down('[name=work_date]').getValue(),
				cvic_idcd = search.down('[name=cvic_name]').getValue(),
				store = Ext.ComponentQuery.query('module-workentry-detail')[0].getStore()
				store2 = Ext.ComponentQuery.query('module-workentry-detail2')[0].getStore(),
				strt_dttm = ''
			;
			if(rec.get('work_strt_dttm')){
				strt_dttm = rec.get('work_strt_dttm').substr(0,10);
			}
			var	form = Ext.widget('form', {
					border: false,
					bodyPadding: 10,
					itemId : 'end',
					fieldDefaults: {
						labelWidth: 200,
						labelStyle: 'text-align:right',
						labelSeparator : '',
					},
					items:[
						{	fieldLabel	: Language.get('work_date','작업일자'),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 535,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							trigger1Cls : _global.options.work_book_tema+'dateTrigger',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: strt_dttm,
							maxValue	: rec.get('invc_date'),
							readOnly	: true
						},{	fieldLabel	: Language.get('work_edtm','종료시간'),
							name		: 'work_edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							hideTrigger	: false,
							value		: rec.get('work_edtm'),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							width		: 533,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							listConfig:{
								itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
							},
							readOnly	: true
						},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
							xtype		: 'popupfield', editable : true, enableKeyEvents : true,
							name		: 'prod_qntt',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							width		: 548,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
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
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger1',
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
									sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
									sttm_temp1 = sttm_temp2.replace(/:/gi,""),
									sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
									sttm_hour = sttm_temp.substring('8','10');
									edtm_hour = param.work_edtm.substring('0','2');
									sttm_min = sttm_temp.substring('10','12');
									edtm_min = param.work_edtm.substring('2','4');
								if(param.prod_qntt==null||param.prod_qntt==''){
									Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
								}else{
									var time  = edtm_hour-sttm_hour;
									var min   = edtm_min-sttm_min;
									if(min < 0){
										time = edtm_hour-sttm_hour-1;
										min  = edtm_min-sttm_min + 60;
									}
									var total = (time*60)+min;
									record = Ext.create( store.model.modelName , {
										invc_numb		: rec.get('invc_numb'),
										wkod_numb		: rec.get('wkod_numb'),
										wkod_seqn		: rec.get('wkod_seqn'),
										pdsd_numb		: rec.get('pdsd_numb'),
										cvic_idcd		: rec.get('cvic_idcd'),
										work_sttm		: rec.get('work_sttm'),
										work_endd_date	: param.work_endd_date,
										work_edtm		: param.work_edtm+'00',
										invc_date		: param.invc_date,
										prod_qntt		: param.prod_qntt,
										need_time		: total,
									});
									store.add(record);
									store.sync({
										callback: function(batch, options) {
											store.reload();
											store2.reload();
											this.up('form').getForm().reset();
											this.up('window').destroy();

										} ,
										scope: this
									},{	synchro : _global.objects.synchro,_set : 'updt',prog_stat_dvcd	: rec.get('prog_stat_dvcd')} );
								}
							}
						},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								this.up('form').getForm().reset();

								Ext.ComponentQuery.query('#end')[0].up('window').destroy();
							}
						}
					]

				});

				win = Ext.widget('window', {
					title: '<span class="btnTemp" style="font-size:15px; color:black;">수정</span>',
					closeAction: 'destory',
					width: 650,
					height: 360,
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
		var search = Ext.ComponentQuery.query('module-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workentry-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-workentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				itemId:'cancle',
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
						value		: rec.get('invc_date'),
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
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								prod_qntt		: rec.get('prod_qntt'),
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
									Ext.ComponentQuery.query('#cancle')[0].up('window').destroy();
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
							Ext.ComponentQuery.query('#cancle')[0].up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'destroy',
				width: 500,
				height: 180,
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