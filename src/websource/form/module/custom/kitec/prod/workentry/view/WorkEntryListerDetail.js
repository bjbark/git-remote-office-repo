Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-kitec-workenty-detail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.kitec.prod.workentry.store.WorkEntryDetail',
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
					{	text	: '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('work_cond','작업조건입력')+'</span>'  ,
						cls		: 'button-left btn btn-primary' ,
						name	: 'workBtn',
						width	: 210,
						height	: 50,
						margin	: '0 0 0 5',
						action	: 'castcond'
					},{	text	: '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('work_cond','작업조건입력')+'</span>'  ,
						cls		: 'button-left btn btn-primary' ,
						name	: 'workBtn2',
						width	: 210,
						height	: 50,
						margin	: '0 0 0 5',
						action	: 'castcond2'
					},{	text	: '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('mtrl_inpt','자재투입')+'</span>'  ,
						cls		: 'button-left btn btn-primary' ,
						name	: 'workMtrl',
						width	: 210,
						height	: 50,
						margin	: '0 0 0 5',
						action	: 'workmtrl'
					},{	text : '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('badn_lost','불량/유실 보고')+'</span>'  ,
						cls  : 'button-left btn btn-primary' ,
						width: 210,
						height : 50,
						margin : '0 0 0 5',
						handler:  function() {
							var detail    = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
								master    = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0],
								select    = detail.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
							}else{
								me.iteminfo(select);
							}
						}
					}
				]
			};
		return item ;
	},
	listeners:{
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
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width :80	, xtype  : 'lookupcolumn'	, lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'wkod_seqn'		, text : Language.get('wkod_seqn'		,'지시순번'	) , flex  : 2	, align  :'center'			, hidden:true
					},{ dataIndex: 'wkod_numb'		, text : Language.get('ordr_numb'		,'작업지시번호') , width : 120	, align  : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 90	, xtype  : 'numericcolumn'
					},{ dataIndex: 'acum_qntt'		, text : Language.get('acum_qntt'		,'누적수량'	) , width : 90	, xtype  : 'numericcolumn'
					},{ dataIndex: 'work_sttm'		, text : Language.get('work_sttm'		,'시작시간'	) , width : 85	, align  : 'center'
					},{ dataIndex: 'work_edtm'		, text : Language.get('work_edtm'		,'종료시간'	) , width : 85	, align  : 'center'			, hidden : true
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'		) , width : 95	, align  : 'center',hidden:true
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 100	, align  : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'작업번호'	) , width : 180	, hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex  : 1	, minWidth : 150
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex  : 2	, hidden : true
					},{ dataIndex: 'wker_name'		, text : Language.get('wker'			,'작업자'	) , width : 100
					},{ dataIndex: 'invc_date'		, text : Language.get('work_date'		,'작업일자'	) , flex  : 2	, hidden : true
					},{ header: Language.get('action','실행'),
						width : 220,
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
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+Language.get('stop','중단')+'</span>',
										cls:'btn btn-warning btnTemp '+_global.options.work_book_tema+'button',
										handler:  function(){me.stop(rec)},
									});
									Ext.widget('button', {
										width:100,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+Language.get('end','종료')+'<span>',
										cls:'btn btn-danger btnTemp '+_global.options.work_book_tema+'button',
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
	//TODO 중단
	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0].getStore(),
			me	= this
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 140,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						maxValue	: new Date(),
						trigger1Cls : _global.options.work_book_tema+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
						readOnly	: true
					},{	fieldLabel	: Language.get('work_edtm','중단시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						readOnly	: true,
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						width		: 435,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						border	: 0,
						height	: 70,
						margin	: '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prod_qntt_l','생산수량(L)'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_qntt',
								hideTrigger	: true,
								readOnly	: false,
								width		: 262,
								height		: 50,
								labelWidth	: 130,
								labelStyle	: 'line-height: 43px;',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.qntt11')[0];
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
								trigger1Cls : 'hideCls qntt11',
							},
							{	fieldLabel	: Language.get('prod_qntt_r','(R)'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_qntt_1fst',
								hideTrigger	: true,
								readOnly	: false,
								width		: 162,
								height		: 50,
								labelWidth	: 30,
								labelStyle	: 'line-height: 43px;',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.qntt21')[0];
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
								trigger1Cls : 'hideCls qntt21',
							}
						]
					},{	fieldLabel	: Language.get('stop_reas', '중단사유'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'base_name',
						pair		: 'dsct_resn_dvcd',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 450,
						height		: 50,
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'module-kitec-workenty-basepopup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',prnt_idcd:'6100'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						}
					},{ xtype		: 'textfield', name:'dsct_resn_dvcd',hidden:true
					},{ xtype		: 'datefield',
						name		: 'work_endd_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date()
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('confirm', '확인')+'</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
								sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
								sttm_temp1 = sttm_temp2.replace(/:/gi,""),
								sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
								sttm_hour = sttm_temp.substring('8','10'),
								edtm_hour = param.work_edtm.substring('0','2'),
								sttm_min = sttm_temp.substring('10','12'),
								edtm_min = param.work_edtm.substring('2','4')
							;
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							var select = me.getSelectionModel().getSelection()[0];
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							record = Ext.create( store2.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								cvic_idcd		: select.get('cvic_idcd'),
								work_edtm		: param.work_edtm+'00',
								invc_date		: param.invc_date,
								prod_qntt		: param.prod_qntt,
								prod_qntt_1fst	: param.prod_qntt_1fst,
								dsct_resn_dvcd	: param.dsct_resn_dvcd,
								need_time		: total,
								work_endd_date	: param.work_date
							});
							store2.add(record);
							store2.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'stop'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel', '취소')+'</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();
//							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('stop', '중단')+'</span>',
				closeAction: 'hide',
				width: 559,
				height: 437,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 종료
	end : function (rec) {
		var	me			= this,
			search		= Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			searchDate	= search.down('[name=work_date]').getValue(),
			wkct_idcd	= search.down('[name=wkct_name]').getValue()
			store		= me.getStore(),
			cnt			= 0
		;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/kitec/prod/workentry/get/chekrpst.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp,
					item_idcd	: rec.get('item_idcd')
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					console.log(result.records[0]);
					cnt = result.records[0].cnt;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

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
						name		: 'invc_date',
						xtype		: 'datefield',
						width		: 535,
						height		: 50,
						readOnly	: true,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.options.work_book_tema+'dateTrigger',
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
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						readOnly	: true,
						width		: 535,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp'
					},{ xtype		: 'datefield',
						name		: 'work_endd_date',
						hidden		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: new Date()
					},{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						height	: 70,
						margin	: '13 0 0 0',
						items: [
							{	fieldLabel	: Language.get('prod_qntt_l','생산수량(L)'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_qntt',
								hideTrigger	: true,
								readOnly	: false,
								width		: 343,
								height		: 50,
								labelWidth	: 190,
								labelStyle	: 'line-height: 44px;',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.qntt12')[0];
											Ext.get(trigger1).dom.click();
										});
										if(!cnt){
											this.width=525;
											this.labelEl.update(Language.get('prod_qntt','생산수량'));
										}
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
								trigger1Cls : 'hideCls qntt12',
							},
							{	fieldLabel	: Language.get('prod_qntt_r','(R)'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_qntt_1fst',
								hideTrigger	: true,
								readOnly	: false,
								width		: 183,
								height		: 50,
								labelWidth	: 30,
								labelStyle	: 'line-height: 44px;',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								handleMouseEvents:true,
								listeners:{
									render:function(field ){
										field.getEl().on('click', function( event, el ) {
											var trigger1 = Ext.dom.Query.select('.qntt21')[0];
											Ext.get(trigger1).dom.click();
										});
										if(!cnt){
											this.hide();
										}
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
								trigger1Cls : 'hideCls qntt21',
							}
						]
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('confirm', '확인')+'</span>',
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
									wkct_idcd		: rec.get('wkct_idcd'),
									cvic_idcd		: rec.get('cvic_idcd'),
									work_sttm		: rec.get('work_sttm'),
									work_edtm		: param.work_edtm+'00',
									invc_date		: param.invc_date,
									prod_qntt		: param.prod_qntt,
									prod_qntt_1fst	: param.prod_qntt_1fst,
									need_time		: total,
									invc_date		: param.invc_date
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										this.up('form').getForm().reset();
										this.up('window').destroy();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : 'end'} );
							}
						}
					},{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel', '취소')+'</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();

//							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('end', '종료')+'</span>',
				closeAction: 'hide',
				width: 650,
				height: 350,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
	},

	//TODO 불량내역
	poor : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			store      = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0].getStore(),
			poorLookup = new Array(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'poor',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:  Language.get('bad_msg', '불량수량을 입력 후 불량유형을 선택하여 주십시오.'),
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 62'
				},{	fieldLabel	: Language.get('poor_qntt', '불량수량'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',							// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',							// field에 클래스추가
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'poor_qntt',
					width		: 430,
					height		: 50,
					maxWidth	: 500,
					labelWidth	: 210,
					margin		: '20 0 0 0',
					listConfig	:{
						itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger1')[0];
								console.log(trigger1);
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
				},
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		var array;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6000",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point = 4;
		for (var i = 0; i < array.length; i++) {
			form.insert(point,{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array[i].base_name+'</span>',
				cls     : 'poorbutton-style',
				itemId	: i,
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var param = Ext.merge( this.up('form').getValues() );
						me.poorupdate(array[this.itemId].base_code,param);
					}
				}
			});
			point++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">'+Language.get('bad_repo','불량보고')+'</span>',
			closeAction	: 'hide',
			width		: 581,
			height		: 230+((80)*(Math.ceil(array.length/3))),
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 유실
	fail : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			store      = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0].getStore(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'fail',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		: Language.get('loss_msg','시간 입력 후 유실 유형을 선택하여 주십시오.'),
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 89'
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 160,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							width		: 280,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls : 'hideCls timeTrigger1',				// trigger(버튼)에 클래스 추가
							listConfig	:{
								itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
							},
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.timeTrigger1')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							cls			: 'textTemp'
						},{	fieldLabel	: Language.get('','~'),
							name		: 'edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							margin		: '0 0 0 10',
							labelWidth	: 30,
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							width		: 150,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							cls			: 'textTemp',
							trigger1Cls : 'hideCls timeTrigger2',				// trigger(버튼)에 클래스 추가
							listConfig	:{
								itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
							},
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.timeTrigger2')[0];
									Ext.get(trigger1).dom.click();
								}
							},
						}
					]
				},
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		var array2;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6100",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array2 = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point2 = 4;
		for (var i = 0; i < array2.length; i++) {
			form.insert(point2,						//위치
				{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array2[i].base_name+'</span>',
					itemId	: i,
					listeners :{
						click : function(){
							var param = Ext.merge( this.up('form').getValues() );
							me.failupdate(array2[this.itemId].base_code,param);
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				}
			);
			point2++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">'+Language.get('lost_repo','유실보고')+'</span>',
			closeAction	: 'hide',
			width		: 586,
			height		: 230+((80)*(Math.ceil(array2.length/3))),
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 불량업데이트
	poorupdate : function (rec,param) {
		var me = this,
			poor_qntt = param.poor_qntt,
			detail    = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
			poor      = Ext.ComponentQuery.query('module-kitec-workenty-poor')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			sttm1      = select.get('work_sttm'),
			edtm1      = select.get('work_edtm'),
			sttm       = null,
			edtm       = ''
		;
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			if(sttm1!=null||sttm1!=undefined){
				sttm = sttm1.replace(':','');
			}
			if(edtm1!=null||edtm1!=undefined){
				edtm = edtm1.replace(':','');
			}
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/workentry/get/poorseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
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
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/workentry/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						poor_bacd		: rec,
						sttm			: sttm,
						edtm			: edtm,
						wker_idcd		: select.get('wker_idcd'),
						good_qntt		: null,
						poor_qntt		: poor_qntt,
						loss_qntt		: null,
						runn_dsct_yorn	: null
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
					Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
					poor.getStore().reload();
				}
			});
		}
	},
	//TODO 유실업데이트
	failupdate : function (rec,param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			sttm      = sttm1.replace(':',''),
			edtm      = edtm1.replace(':',''),
			detail    = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
			fail      = Ext.ComponentQuery.query('module-kitec-workenty-fail')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0.
			sttm_hour = sttm.substring(0,2)
			sttm_min  = sttm.substring(2,4)
			edtm_hour  = edtm.substring(0,2)
			edtm_min  = edtm.substring(2,4)
			time = edtm_hour-sttm_hour,
			min  = edtm_min-sttm_min
		;
		if(sttm1==null||edtm1==null||sttm1==''||edtm1==''||sttm>edtm){
			Ext.Msg.alert("알림","시간을 다시 입력하여주십시오.");
		}else{
			if(min < 0){
				time = edtm_hour-sttm_hour-1;
				min  = edtm_min-sttm_min + 60;
			}
			var total = (time*60)+min;
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/workentry/get/failseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
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
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/workentry/set/fail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						cvic_idcd		: select.get('cvic_idcd'),
						loss_resn_dvcd	: rec,
						sttm			: sttm+'00',
						edtm			: edtm+'00',
						loss_time		: total,
						loss_pcnt		: 0,
						loss_mnhr		: 0,
						work_dsct_yorn	: 0,
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
					Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					fail.getStore().reload();
				}
			});
		}
	},
	//TODO 품목
	iteminfo : function (select) {
		var search     = Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			poor       = Ext.ComponentQuery.query('module-kitec-workenty-poor')[0],
			store      = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0].getStore(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'info',
			layout         : 'border',
			bodyPadding    : 5,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0', region:'north',
					items	: [
						{	xtype		: 'image',
							name		: 'image',
							id			: 'image',
							src			: '',
							width		: 207,
							height		: 220,
							margin		: '10 0 5 18',
							hidden		: false,
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							value		: select.get('item_imge'),
							listeners	: {
								render:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('ordr_numb','지시번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp',
											value		: select.get('invc_numb')
										},{	fieldLabel	: Language.get('work_sttm','작업시간'),
											name		: 'work_sttm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											value		: select.get('work_sttm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 200,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','~'),
											name		: 'work_edtm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 15,
											value		: select.get('work_edtm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 125,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('lott_numb','LOT번호'),
											name		: 'lott_numb',
											xtype		: 'textfield',
											value		: select.get('lott_numb'),
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 95,
											readOnly	: true,
											width		: 320,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 50,
											value		: select.get('item_code'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('item_name','품목'),
											name		: 'item_name',
											xtype		: 'textfield',
											value		: select.get('item_name'),
											labelWidth	: 100,
											hideTrigger	: true,
											readOnly	: true,
											width		: 675,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('cvic_code','설비코드'),
											name		: 'cvic_code',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											value		: select.get('cvic_code'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('cvic_name','설비명'),
											name		: 'cvic_name',
											xtype		: 'textfield',
											labelWidth	: 100,
											hideTrigger	: true,
											readOnly	: true,
											width		: 345,
											height		: 40,
											value		: select.get('cvic_name'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'iteminfoPopupfield',
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('remk_text','비고사항'),
											name		: 'remk_text',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 965,
											value		: select.get('remk_text'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'iteminfo',
											fieldStyle	: 'text-align: left;font-size:19px !important;',
											cls			: 'textTemp',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
									items	: [
										{	text : '<span class="btnTemp" style="font-size:2.5em;">'+ Language.get('bad_repo','불량보고')+'</span>'  ,
											xtype : 'button',
											handler:  function(){
												var detail    = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
													select    = detail.getSelectionModel().getSelection()[0]
												;
												if(!select){
													Ext.Msg.alert("알림","불량을 등록할 내역을 선택하여주십시오.");
												}else{
													me.poor()
												}
											},
											cls: 'button-left btn btn-danger',
											width: 150,
											height: 50,
											margin: '0 0 0 237'
										},{	text : '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('lost_repo','유실보고')+'</span>'  ,
											xtype : 'button',
											handler:  function(){
												var detail    = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0],
													select    = detail.getSelectionModel().getSelection()[0]
												;
												if(!select){
													Ext.Msg.alert("알림","유실 보고할 내역을 선택하여주십시오.");
												}else{
													me.fail()
												}
											},
											cls: 'button-left btn btn-warning',
											width: 150,
											height: 50,
											margin: '0 0 0 446'
										}
									]
								}
							]
						}
					]
				},{	xtype : 'module-kitec-workenty-poor', region:'west' , flex : 1, height:200 ,margin: '0 0 0 17'
				},{	xtype : 'module-kitec-workenty-fail',region:'center', flex : 1, height:200 ,margin: '0 17 0 0'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel','취소')+'</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('badn_lost','불량/유실 보고')+'</span>',
			closeAction	: 'hide',
			width		: 1249,
			height		: 844,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},

});