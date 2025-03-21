Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplan-lister1',
	
	store		: 'module.custom.sjflv.prod.prodplan.store.ProdPlanLister1',
	border		: 0,
	title		: Language.get('','생산계획'),
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	listeners	: {
		afterrender: function( self, eOpts ) {
			self.view.getFeature('itemCodeGrouping').disable();
		}
	},
	features: [{
		ftype: 'grouping',
		groupHeaderTpl: '제품코드: {name}',
		id: 'itemCodeGrouping'
	}],
	
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
		btnText = '<span style="font-size: small !important; color: white;">재고할당 등록</span>',
		btnText2 = '<span style="font-size: small !important; color: white;">HTML</span>',
		btnText3 = '<span style="font-size: small !important; color: white;">파일업로드</span>',
		btnText4 = '<span style="font-size: small !important; color: white;">계산</span>',
			item = {
				xtype	: 'grid-paging',
				dock	: 'bottom',
				items	: [
					'->',
					{ text: btnText4, action: "showPlanNdqtPopup"	, cls: 'button1-style'	, width: 100 },
					'-',
					{ text: btnText	, action: "showStockAsgnPopup"	, cls: 'button1-style'	, width: 100 },
					'->',
					{ text: Const.EXPORT.text	, iconCls: Const.EXPORT.icon	, action: Const.EXPORT.action	, cls: 'button-style' },
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{ text: Language.get(''				, '생산계획수립'	) , dataIndex: ''				, width: 100	, align: 'center'
						, renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">생산계획</span>',
									width	: 60,
									height	: 19,
									cls		: 'button-style',
									handler	: function(b, e){
										e.stopEvent();
										var selection = me.getSelectionModel().getSelection();
										if(selection.length === 0){
											selection = rec;
										} else {
											var itemCode = selection[0].get('item_code');
											var count = 0;
											Ext.Array.forEach(selection, function(record){
												if (itemCode != record.get('item_code')) {
													count++;
												}
											})											
										}
										
										if (count > 0) {
											Ext.Msg.alert('알림', '통합 생산계획은 동일 제품이어야 합니다.');
											return false;
										} else {
											me.loadPopup(selection)	
										}
									}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						}
					},{	text: Language.get('invc_numb'		, '주문번호'		) , dataIndex: 'invc_numb'		, width: 90		, align: 'center'
					},{	text: Language.get('line_seqn'		, '항번'			) , dataIndex: 'line_seqn'		, width: 35		, align: 'center'
					},{	text: Language.get('deli_date'		, '납기일자'		) , dataIndex: 'deli_date'		, width: 80		, align: 'center'
					},{	text: Language.get('prod_trst_dvcd'	, '생산구분'		) , dataIndex: 'prod_trst_dvcd'	, width: 80		, align: 'center'	, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('prod_trst_dvcd')
					},{	text: Language.get('cstm_name'		, '거래처명'		) , dataIndex: 'cstm_name'		, width: 140
					},{	text: Language.get('item_code'		, '제품코드'		) , dataIndex: 'item_code'		, width: 100	, align: 'center'
					},{	text: Language.get('item_name'		, '품명'			) , dataIndex: 'item_name'		, width: 250	, align: 'left'
					},{	text: Language.get('item_spec'		, '규격'			) , dataIndex: 'item_spec'		, width: 140	, align: 'left'
					},{	text: Language.get('invc_qntt'		, '주문수량'		) , dataIndex: 'invc_qntt'		, width: 70		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('stok_asgn_qntt'	, '재고할당'		) , dataIndex: 'stok_asgn_qntt'	, width: 80		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get(''				, '추가생산량'		) , dataIndex: 'add_plan_qntt'	, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('stok_qntt'		, '재고수량'		) , dataIndex: 'stok_qntt'		, width: 80		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get(''				, '생산계획량'		) , dataIndex: 'total_plan_qntt', width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('plan_baln_qntt'	, '계획잔량'		) , dataIndex: 'plan_baln_qntt'	, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get(''				, '원재료재고여부'	) , dataIndex: 'need_stok_yorn'	, width: 100	, align: 'center'
						, renderer: function(val,meta,rec) {
							if (val === 'N') {
								meta.style = "background-color: red; color: white; margin: 3 0 3 0; font-weight: bold;";
							}
							return val;
						}
					},{	text: Language.get('remk_text'		, '특이사항'		) , dataIndex: 'remk_text'		, minWidth: 150	, align: 'left'	, flex: 1
					},
				]
			};
		return item;
	},

	loadPopup: function(records) {
		var me = this,
		data = [],
		popup = undefined;
		
		if (records.length > 1) {
			Ext.Msg.confirm("확인", "통합 생산계획을 하시겠습니까?", function(btn) {
				if (btn == 'yes') {
					var planBalnQntt = 0;
					var minDate = undefined;
					Ext.Array.forEach(records, function(rec){
						data.push(Ext.merge(rec.data, {plan_qntt: rec.get('plan_baln_qntt')}));
						planBalnQntt += Number(rec.get('plan_baln_qntt'));
						if (minDate > Ext.util.Format.dateToStr(rec.get('deli_date')) || minDate === undefined) {
							minDate = Ext.util.Format.dateToStr(rec.get('deli_date'))
						}
					});
					var param = Ext.create('module.custom.sjflv.prod.prodplan.model.ProdPlanPopupLister', {
						item_code: records[0].get('item_code'),
						item_name: records[0].get('item_name'),
						item_spec: records[0].get('item_spec'),
						item_idcd: records[0].get('item_idcd'),
						acpt_numb: records[0].get('acpt_numb'),
						acpt_seqn: records[0].get('acpt_seqn'),
						deli_date: minDate,
						plan_date: minDate > Ext.Date.format(new Date(), 'Ymd') ? Ext.Date.format(new Date(), 'Y-m-d') : minDate,
						plan_baln_qntt: planBalnQntt,
						incm_loss_rate: records[0].get('incm_loss_rate')
					});
					popup = resource.loadPopup({
						widget	: 'module-sjflv-prodplan-popup2',
						params	: param,
						caller	: me
					});
					popup.down('grid').getStore().add(data);
					popup.calculateUpidQntt(popup.down('grid').getStore());
					popup.down('[name=pckg_unit]').fireEvent('blur');
				}
			});
		} else {
			if (records.length === 1) {
				records = records[0];
			}
			popup = resource.loadPopup({
				widget	: 'module-sjflv-prodplan-popup',
				params	: records,
				caller	: me
			});
			popup.down('grid').getStore().add(Ext.merge(records.data, {
				plan_qntt: records.get('plan_baln_qntt'), 
				plan_date: records.get('deli_date') < Ext.Date.format(new Date(), 'Ymd') ? records.get('deli_date') : Ext.Date.format(new Date(), 'Ymd')
			}));
			popup.calculateRemainingPlan(popup.down('grid').getStore());
			popup.down('[name=labl_qntt_apply_btn]').fireEvent('click');
		}
	}
});

