Ext.define('module.prod.order.workentry.view.WorkEntryListerSjung', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister-sjung'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntry',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->','->',
					{	text : '<span class="write-button">설비연계</span>'				, action : 'facilConnAction'    , cls: 'button1-style', width : 100		},
					{	text : '<span class="write-button">라벨 발행</span>'				, action : 'labelAction'        , cls: 'button1-style', width : 100		},
					{	text : '<span class="write-button">시험성적서 발행</span>'			, action : 'testReportAction'   , cls: 'button1-style', width : 100		},
					{	text : '<span class="write-button">제품표준서 발행</span>'			, action : 'prodStandardAction' , cls: 'button1-style', width : 100		},
					{	text : '<span class="write-button">specification 보기</span>'	, action : 'specificationAction', cls: 'button1-style', width : 100		},
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	, '진행상태구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					},{ header: '작업',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();

							var progStatDvcd = rec.get('prog_stat_dvcd');
							var buttonText;
							var buttonCls;
							var buttonHandler

							if (progStatDvcd == '0') {
								buttonText = '<span style="color: white !important;">생산시작</span>';
								buttonCls = 'button-style';
								buttonHandler = function(b) { me.workStart(rec); }
							} else if (progStatDvcd == '1') {
								buttonText = '<span style="color: white !important;">생산종료</span>';
								buttonCls = 'button1-style';
								buttonHandler = function(b) { me.workEnd(rec); }
							} else if (progStatDvcd == '5') {
								buttonText = '<span style="color: white !important;">투입대기</span>';
								buttonCls = 'button1-style';
								buttonHandler = function(b) { me.workIvstMtrl(rec); }; // 취소 처리 핸들러
							} else if (progStatDvcd == '3') {
								buttonText = '<span style="color: white !important;">취소</span>';
								buttonCls = 'button1-style'; // 취소 버튼의 스타일 클래스
								buttonHandler = function(b) { me.workCancel(rec); }; // 취소 처리 핸들러
							}

							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: buttonText,
									width	: 60,
									height	: 19,
									cls		: buttonCls,
									handler	: buttonHandler,
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					},{	dataIndex: 'invc_numb'	, text : Language.get('invc_numb'	,'지시번호'			) , width : 100 , align : 'center'
					},{	dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'			) , width : 100 , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'제품코드'			) , width : 80  , align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'			) , width : 150 , align : 'center'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'			) , width : 100 , align : 'center'
					},{ dataIndex: 'lott_numb'	, text : Language.get('lott_numb'	,'Batch No'		) , width : 100 , align : 'center'
					},{ dataIndex: 'indn_qntt'	, text : Language.get('indn_qntt'	,'지시수량'			) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,###.##9',
					},{ dataIndex: 'prod_qntt'	, text : Language.get('prod_qntt'	,'생산수량'			) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,###.##9',
					},{ dataIndex: 'strt_dttm'	, text : Language.get('strt_dttm'	,'시작일시'			) , width : 120 , align : 'center'
					},{ dataIndex: 'endd_dttm'	, text : Language.get('endd_dttm'	,'완료일시'			) , width : 120 , align : 'center'
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'생산설비'			) , width : 80  , align : 'center'
					},{ dataIndex: 'wker_name'	, text : Language.get('wker_name'	,'작업자'			) , width : 100 , align : 'center'
					},{ dataIndex: 'wigh_wker_name'	, text : Language.get('wigh_wker_name'	,'계량작업자'			) , width : 100 , align : 'center'
					},{ dataIndex: 'pckg_unit'	, text : Language.get('pckg_unit'	,'포장단위'			) , width : 80  , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'특이사항1'		) , width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'	, text : Language.get('remk_text'	,'특이사항2'		) , width : 100 , align : 'center',
					},{ dataIndex: ''		, text : Language.get(''	,'표준서'		) , width : 100 , align : 'center'
					},
				]
			}
		;
		return item;
	},

	//TODO 시작
	workStart : function (rec) {
		var me = this,
			lister1= Ext.ComponentQuery.query('module-workentry-lister-sjung')[0],
			select = lister1.getSelectionModel().getSelection()
		;
		if (select.length > 0) {
			var selectedRecord = select[0]; // 첫 번째 선택된 레코드
			resource.loadPopup({
				widget: 'module-workentry-popup-start',
				params: {
					invc_numb: selectedRecord.get('invc_numb'),
					cstm_idcd: selectedRecord.get('cstm_idcd'),
					cstm_name: selectedRecord.get('cstm_name'),
					item_idcd: selectedRecord.get('item_idcd'),
					item_name: selectedRecord.get('item_name'),
					item_code: selectedRecord.get('item_code'),
					item_spec: selectedRecord.get('item_spec'),
					indn_qntt: selectedRecord.get('indn_qntt'),
					pckg_unit: selectedRecord.get('pckg_unit'),
					labl_qntt: selectedRecord.get('labl_qntt'),
					plan_strt_dttm: selectedRecord.get('plan_strt_dttm'),
					plan_endd_dttm: selectedRecord.get('plan_endd_dttm'),
					usge_attc_yorn: selectedRecord.get('usge_attc_yorn'),
					user_memo: selectedRecord.get('user_memo'),
					pdsd_numb: selectedRecord.get('pdsd_numb'),
					wker_name: selectedRecord.get('wker_name'),
					wker_idcd: selectedRecord.get('wker_idcd'),
					cvic_idcd: selectedRecord.get('cvic_idcd'),
					cvic_name: selectedRecord.get('cvic_name'),
					work_invc: selectedRecord.get('work_invc'),
				},
			});
		} else {
			console.log("선택된 항목이 없습니다.");
		}
	},

	//TODO 시작
	workEnd : function (rec) {
		var me = this,
			lister1= Ext.ComponentQuery.query('module-workentry-lister-sjung')[0],
			select = lister1.getSelectionModel().getSelection()
		;
		if (select.length > 0) {
			var selectedRecord = select[0]; // 첫 번째 선택된 레코드

			resource.loadPopup({
				widget: 'module-workentry-popup-end',
				params: {
					invc_numb: selectedRecord.get('invc_numb'),
					cstm_idcd: selectedRecord.get('cstm_idcd'),
					cstm_name: selectedRecord.get('cstm_name'),
					item_idcd: selectedRecord.get('item_idcd'),
					item_name: selectedRecord.get('item_name'),
					item_code: selectedRecord.get('item_code'),
					item_spec: selectedRecord.get('item_spec'),
					indn_qntt: selectedRecord.get('indn_qntt'),
					pckg_unit: selectedRecord.get('pckg_unit'),
					labl_qntt: selectedRecord.get('labl_qntt'),
					plan_strt_dttm: selectedRecord.get('plan_strt_dttm'),
					plan_endd_dttm: selectedRecord.get('plan_endd_dttm'),
					strt_dttm:selectedRecord.get('strt_dttm'),
					wker_name: selectedRecord.get('wker_name'),
					wker_idcd: selectedRecord.get('wker_idcd'),
					cvic_name: selectedRecord.get('cvic_name'),
					cvic_idcd: selectedRecord.get('cvic_idcd'),
					usge_attc_yorn: selectedRecord.get('usge_attc_yorn'),
					user_memo: selectedRecord.get('user_memo'),
					pdsd_numb: selectedRecord.get('pdsd_numb'),
					yorn	 : selectedRecord.get('yorn'),
					work_invc: selectedRecord.get('work_invc'),
					lott_numb: selectedRecord.get('lott_numb') ? selectedRecord.get('lott_numb'): ' ',
				},
			});
		} else {
			console.log("선택된 항목이 없습니다.");
		}
	},

	//TODO 시작
	workIvstMtrl : function (rec) {
		var me = this,
			lister1= Ext.ComponentQuery.query('module-workentry-lister-sjung')[0],
			select = lister1.getSelectionModel().getSelection()
		;
		if (select.length > 0) {
			var selectedRecord = select[0]; // 첫 번째 선택된 레코드

			resource.loadPopup({
				widget: 'module-workentry-popup-mtrl',
				params: {
					invc_numb: selectedRecord.get('invc_numb'),
					cstm_idcd: selectedRecord.get('cstm_idcd'),
					cstm_name: selectedRecord.get('cstm_name'),
					item_idcd: selectedRecord.get('item_idcd'),
					item_name: selectedRecord.get('item_name'),
					item_code: selectedRecord.get('item_code'),
					item_spec: selectedRecord.get('item_spec'),
					indn_qntt: selectedRecord.get('indn_qntt'),
					pckg_unit: selectedRecord.get('pckg_unit'),
					labl_qntt: selectedRecord.get('labl_qntt'),
					plan_strt_dttm: selectedRecord.get('plan_strt_dttm'),
					plan_endd_dttm: selectedRecord.get('plan_endd_dttm'),
					strt_dttm:selectedRecord.get('strt_dttm'),
					wker_name: selectedRecord.get('wker_name'),
					wker_idcd: selectedRecord.get('wker_idcd'),
					cvic_name: selectedRecord.get('cvic_name'),
					cvic_idcd: selectedRecord.get('cvic_idcd'),
					usge_attc_yorn: selectedRecord.get('usge_attc_yorn'),
					user_memo: selectedRecord.get('user_memo'),
					pdsd_numb: selectedRecord.get('pdsd_numb'),
					yorn	 : selectedRecord.get('yorn'),
					work_invc: selectedRecord.get('work_invc'),
					wigh_wker_idcd : selectedRecord.get('wigh_wker_idcd'),
					wigh_wker_name : selectedRecord.get('wigh_wker_name'),
				},
			});
		} else {
			console.log("선택된 항목이 없습니다.");
		}
	},

	//TODO 시작
	workCancel : function (rec) {
		var me = this,
			lister1= Ext.ComponentQuery.query('module-workentry-lister-sjung')[0],
			select = lister1.getSelectionModel().getSelection()
		;
		var err_msg = "";

		var records = [];

		if (select) {
			Ext.Msg.confirm("확인", "생산종료를 취소 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						record.dirtyValue('_set', 'cancel');
						record.store.commitChanges();
					});
				Ext.each(select, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/prod/workbook/set/setMaster.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								wkod_numb	: select[0].get('invc_numb'),
								wkod_seqn	:'1',
								invc_numb	: select[0].get('work_invc'),
								_set		: 'cancel',
								records		: records,
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								lister1.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
	}
});