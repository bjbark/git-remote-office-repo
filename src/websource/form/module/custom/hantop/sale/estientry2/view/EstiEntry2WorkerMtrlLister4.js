Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister4', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estientry2-mtrl-lister4',
	store: 'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerMtrlLister',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();

	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '전체',
								name		: 'bfsf_dvcd',
								width		: 50,
								margin		: '0 0 0 10',
								value		: true,
								inputValue	: '1',
								listeners	: {
									change : function(){
										var mtrl1 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0],
											mtrl2 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister2')[0],
											mtrl3 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister3')[0],
											mtrl5 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister5')[0]
										;

										mtrl1.down('[name=bfsf_dvcd]').setValue(this.value);
										mtrl2.down('[name=bfsf_dvcd]').setValue(this.value);
										mtrl3.down('[name=bfsf_dvcd]').setValue(this.value);
//										mtrl5.down('[name=bfsf_dvcd]').setValue(this.value);

										me.select();
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '틀',
								name		: 'bfsf_dvcd1',
								width		: 50,
								margin		: '0 0 0 10',
								inputValue	: '1',
								listeners	: {
									change : function(){
										var mtrl1 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0],
											mtrl2 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister2')[0],
											mtrl3 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister3')[0],
											mtrl5 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister5')[0]
										;

										mtrl1.down('[name=bfsf_dvcd1]').setValue(this.value);
										mtrl2.down('[name=bfsf_dvcd1]').setValue(this.value);
										mtrl3.down('[name=bfsf_dvcd1]').setValue(this.value);
//										mtrl5.down('[name=bfsf_dvcd1]').setValue(this.value);

										me.select();
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '짝',
								name		: 'bfsf_dvcd2',
								width		: 50,
								inputValue	: '1',
								listeners	: {
									change : function(){
										var mtrl1 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0],
											mtrl2 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister2')[0],
											mtrl3 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister3')[0],
											mtrl5 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister5')[0]
										;

										mtrl1.down('[name=bfsf_dvcd2]').setValue(this.value);
										mtrl2.down('[name=bfsf_dvcd2]').setValue(this.value);
										mtrl3.down('[name=bfsf_dvcd2]').setValue(this.value);
//										mtrl5.down('[name=bfsf_dvcd2]').setValue(this.value);

										me.select();
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '망',
								name		: 'bfsf_dvcd3',
								inputValue	: '1',
								width		: 50,
								listeners	: {
									change : function(){
										var mtrl1 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0],
											mtrl2 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister2')[0],
											mtrl3 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister3')[0],
											mtrl5 = Ext.ComponentQuery.query('module-estientry2-mtrl-lister5')[0]
										;

										mtrl1.down('[name=bfsf_dvcd3]').setValue(this.value);
										mtrl2.down('[name=bfsf_dvcd3]').setValue(this.value);
										mtrl3.down('[name=bfsf_dvcd3]').setValue(this.value);
//										mtrl5.down('[name=bfsf_dvcd3]').setValue(this.value);

										me.select();
									}
								}
							}
						]
					},
					'-',
					{	text : '<span class="write-button">추가</span>'	, action : ''	, cls: 'button1-style'	} , '-', '-',
					{	text : '<span class="write-button">저장후 품목추가</span>', scope: me, handler: me.addAction, cls: 'button1-style', width : 130	} , '-',
					'-', '->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.closeAction, cls: 'button-style' }
				],
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'			, text: Language.get( 'line_seqn'		, '순번'		), width :  50, align : 'center'
					},{	dataIndex:	'dvcd'				, text: Language.get( 'dvcd'			, '구분'		), width : 40, align : 'center'
					},{	dataIndex:	'ivst_item_idcd'	, text: Language.get( 'ivst_item_idcd'	, '품목코드'	), width : 200, align : 'left'
					},{	dataIndex:	'ivst_item_name'	, text: Language.get( 'ivst_item_name'	, '품목명'	), flex  :   1, align : 'left'
					},{	dataIndex:	'ivst_item_spec'	, text: Language.get( 'ivst_item_spec'	, '품목규격'	), width : 200, align : 'left'
					},{	dataIndex:	''					, text: Language.get( ''				, '단위'		), width :  80, align : 'center'
					},{	dataIndex:	'calc_frml'			, text: Language.get( 'calc_frml'		, '계산공식'	), flex  :   1, align : 'left'
					},{	dataIndex:	'need_qntt'			, text: Language.get( 'need_qntt'		, '소요량'	), width :  80, align : 'right', xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'esnt_yorn'			, text: Language.get( 'esnt_yorn'		, '필수여부'	), width :  80, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					}
				]
			};
		return item;
	},


	finishAction : function(){
		var me		= Ext.ComponentQuery.query('module-estientry2-popup')[0],
			record	= undefined
			store	= Ext.ComponentQuery.query('module-estientry2-worker-lister')[0].getStore(),
			store2	= me.down('#lister2').getStore(),
			values	= me.down('form').getValues(),
			uper_seqn	= 0,
			name	= values.wdsf_rate_name,
			name2	= '2W',
			vent_plac_dvcd = undefined
		;
		//창호형태가 2W인것만 VENT 선택 가능, 선택하지않으면 X로 value set
		if(name.search(name2.toUpperCase()) == '0'){
			vent_plac_dvcd = values.vent_plac_dvcd;
		}else{
			vent_plac_dvcd = 'X';
		}

		if(values.brnd_bacd == ''){
			Ext.Msg.alert("알림", "브랜드를 선택하여 주십시오.");
			return;
		}
		if(values.wndw_modl_idcd == ''){
			Ext.Msg.alert("알림", "창호모델을 선택하여 주십시오.");
			return;
		}
		if(values.item_widh == null){
			Ext.Msg.alert("알림", "길이를 입력하여 주십시오.");
			return;
		}
		if(values.item_hght == null){
			Ext.Msg.alert("알림", "높이를 입력하여 주십시오.");
			return;
		}
		if(values.ispl_name == ''){
			Ext.Msg.alert("알림", "설치위치를 입력하여 주십시오.");
			return;
		}
		if(values.invc_qntt == null){
			Ext.Msg.alert("알림", "수량을 입력하여 주십시오.");
			return;
		}
		if(values.rpst_wryp_name == ''){
			Ext.Msg.alert("알림", "대표색상을 입력하여 주십시오.");
			return;
		}
		if(values.ings_tick == ''){
			Ext.Msg.alert("알림", "유리두께를 입력하여 주십시오.");
			return;
		}

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}

		if(me.popup.params){
			var record = me.popup.params.record;
			if(record != undefined){
				record.set('base_name', values.base_name);
				record.set('brnd_bacd', values.brnd_bacd);
				record.set('ispl_name', values.ispl_name);
				record.set('wndw_modl_idcd', values.wndw_modl_idcd);
				record.set('wdgr_idcd', values.wdgr_idcd);
				record.set('wdgr_name', values.wdgr_name);
				record.set('modl_name', values.modl_name);
				record.set('invc_qntt', values.invc_qntt);
				record.set('wdtp_name', values.wdtp_name);
				record.set('wdbf_itid', values.wdbf_itid);
				record.set('wdsf_itid', values.wdsf_itid);
				record.set('item_widh', values.item_widh);
				record.set('item_hght', values.item_hght);
				record.set('item_widh_1fst', values.item_widh_1fst);
				record.set('item_hght_1fst', values.item_hght_1fst);
				record.set('inwp_itid', values.inwp_itid);
				record.set('otwp_itid', values.otwp_itid);
				record.set('ings_tick', values.ings_tick);
				record.set('otgs_tick', values.otgs_tick);
				record.set('wdbf_incl_yorn', values.wdbf_incl_yorn);
				record.set('wdsf_incl_yorn', values.wdsf_incl_yorn);
				record.set('vent_plac_dvcd', vent_plac_dvcd);
				record.set('rpst_wryp_name', values.rpst_wryp_name);
				record.set('bycv_incl_yorn', values.bycv_incl_yorn);
				record.set('bfrn_incl_yorn', values.bfrn_incl_yorn);
				record.set('moss_incl_yorn', values.moss_incl_yorn);
				record.set('moss_itid', values.moss_itid);
				record.set('hndl_hght', values.hndl_hght);
				record.set('esti_trff', values.esti_trff);
				record.set('remk_text', values.remk_text);
				record.set('glss_amnt_incl_yorn', values.glss_amnt_incl_yorn);
				record.set('wdbf_auto_cutt_yorn', values.wdbf_auto_cutt_yorn);
				record.set('wdbf_auto_weld_yorn', values.wdbf_auto_weld_yorn);
				record.set('wdsf_auto_cutt_yorn', values.wdsf_auto_cutt_yorn);
				record.set('wdsf_auto_weld_yorn', values.wdsf_auto_weld_yorn);
				record.set('wdsf_rate_name', values.wdsf_rate_name);
			}
		}else{
			var seq = uper_seqn + 1;
			var dsp = uper_seqn + 1;
			record = Ext.create( store.model.modelName , {
				line_seqn		: seq,
				brnd_bacd		: values.brnd_bacd,			//브랜드코드
				base_name		: values.base_name,			//브랜드명
				wdgr_idcd		: values.wdgr_idcd,			//창호그룹ID
				wdgr_name		: values.wdgr_name,			//창호그룹명
				wdtp_idcd		: values.wdtp_idcd,			//창호형태ID
				wndw_modl_idcd	: values.wndw_modl_idcd,	//창호모델ID
				modl_name		: values.modl_name,			//모델명
				invc_qntt		: values.invc_qntt,			//수량
				ispl_name		: values.ispl_name,			//설치위치
				wdbf_itid		: values.wdbf_itid,			//BF품목ID
				wdsf_itid		: values.wdsf_itid,			//SF품목ID
				item_widh		: values.item_widh,			//길이
				item_hght		: values.item_hght,			//높이
				item_widh_1fst	: values.item_widh_1fst,	//길이1
				item_hght_1fst	: values.item_hght_1fst,	//높이1
				inwp_itid		: values.inwp_itid,			//내부랩핑품목ID
				otwp_itid		: values.otwp_itid,			//외부랩핑품목ID
				ings_tick		: values.ings_tick,			//내부유리두께
				otgs_tick		: values.otgs_tick,			//외부유리두께
				vent_plac_dvcd	: vent_plac_dvcd,			//vent위치구분코드
				rpst_wryp_name	: values.rpst_wryp_name,	//대표래핑명
				bfrn_incl_yorn	: values.bfrn_incl_yorn,	//bf보강재포함여부
				wdbf_incl_yorn	: values.wdbf_incl_yorn,	//창틀포함여부
				wdsf_incl_yorn	: values.wdsf_incl_yorn,	//창짝포함여부
				moss_incl_yorn	: values.moss_incl_yorn,	//방충망포함여부
				moss_itid		: values.moss_itid,			//방충망품목ID
				hndl_hght		: values.hndl_hght,			//핸들높이
				esti_trff		: values.esti_trff,			//견적요율
				remk_text		: values.remk_text,			//비고
				wdsf_rate_name	: values.wdsf_rate_name,	//창형태 = 창짝비율명
				glss_amnt_incl_yorn	: values.glss_amnt_incl_yorn,	//유리금액포함여부
				wdbf_auto_cutt_yorn	: values.wdbf_auto_cutt_yorn,	//BF자동절단여부
				wdbf_auto_weld_yorn	: values.wdbf_auto_weld_yorn,	//BF자동용접여부
				wdsf_auto_cutt_yorn	: values.wdsf_auto_cutt_yorn,	//SF자동절단여부
				wdsf_auto_weld_yorn	: values.wdsf_auto_weld_yorn,	//SF자동용접여부
			});
			store.add(record);
			store2.add(record);
		}
		me.setResponse(record);
	},


	addAction : function(){
		var me		= Ext.ComponentQuery.query('module-estientry2-popup')[0],
			record	= undefined
			store	= Ext.ComponentQuery.query('module-estientry2-worker-lister')[0].getStore(),
			store2	= me.down('#lister2').getStore(),
			values	= me.down('form').getValues(),
			uper_seqn	= 0,
			name	= values.wdsf_rate_name,
			name2	= '2W',
			vent_plac_dvcd = undefined
		;

		//창호형태가 2W인것만 VENT 선택 가능, 선택하지않으면 X로 value set
		if(name.search(name2.toUpperCase()) == '0'){
			vent_plac_dvcd = values.vent_plac_dvcd;
		}else{
			vent_plac_dvcd = 'X';
		}

		if(values.brnd_bacd == ''){
			Ext.Msg.alert("알림", "브랜드를 선택하여 주십시오.");
			return;
		}
		if(values.wndw_modl_idcd  == ''){
			Ext.Msg.alert("알림", "창호모델을 선택하여 주십시오.");
			return;
		}
		if(values.ispl_name == ''){
			Ext.Msg.alert("알림", "설치위치를 입력하여 주십시오.");
			return;
		}
		if(values.invc_qntt == null){
			Ext.Msg.alert("알림", "수량을 입력하여 주십시오.");
			return;
		}
		if(values.item_widh == null){
			Ext.Msg.alert("알림", "길이를 입력하여 주십시오.");
			return;
		}
		if(values.item_hght == null){
			Ext.Msg.alert("알림", "높이를 입력하여 주십시오.");
			return;
		}
		if(values.rpst_wryp_name == ''){
			Ext.Msg.alert("알림", "대표색상을 입력하여 주십시오.");
			return;
		}
		if(values.ings_tick == ''){
			Ext.Msg.alert("알림", "유리두께를 입력하여 주십시오.");
			return;
		}

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}

		if(me.popup.params){
			var record = me.popup.params.record;
			if(record != undefined){
				record.set('base_name', values.base_name);
				record.set('brnd_bacd', values.brnd_bacd);
				record.set('ispl_name', values.ispl_name);
				record.set('wndw_modl_idcd', values.wndw_modl_idcd);
				record.set('wdgr_idcd', values.wdgr_idcd);
				record.set('wdgr_name', values.wdgr_name);
				record.set('modl_name', values.modl_name);
				record.set('invc_qntt', values.invc_qntt);
				record.set('wdtp_name', values.wdtp_name);
				record.set('wdbf_itid', values.wdbf_itid);
				record.set('wdsf_itid', values.wdsf_itid);
				record.set('item_widh', values.item_widh);
				record.set('item_hght', values.item_hght);
				record.set('item_widh_1fst', values.item_widh_1fst);
				record.set('item_hght_1fst', values.item_hght_1fst);
				record.set('inwp_itid', values.inwp_itid);
				record.set('otwp_itid', values.otwp_itid);
				record.set('ings_tick', values.ings_tick);
				record.set('otgs_tick', values.otgs_tick);
				record.set('wdbf_incl_yorn', values.wdbf_incl_yorn);
				record.set('wdsf_incl_yorn', values.wdsf_incl_yorn);
				record.set('vent_plac_dvcd', vent_plac_dvcd);
				record.set('rpst_wryp_name', values.rpst_wryp_name);
				record.set('bycv_incl_yorn', values.bycv_incl_yorn);
				record.set('bfrn_incl_yorn', values.bfrn_incl_yorn);
				record.set('moss_incl_yorn', values.moss_incl_yorn);
				record.set('moss_itid', values.moss_itid);
				record.set('hndl_hght', values.hndl_hght);
				record.set('esti_trff', values.esti_trff);
				record.set('remk_text', values.remk_text);
				record.set('glss_amnt_incl_yorn', values.glss_amnt_incl_yorn);
				record.set('wdbf_auto_cutt_yorn', values.wdbf_auto_cutt_yorn);
				record.set('wdbf_auto_weld_yorn', values.wdbf_auto_weld_yorn);
				record.set('wdsf_auto_cutt_yorn', values.wdsf_auto_cutt_yorn);
				record.set('wdsf_auto_weld_yorn', values.wdsf_auto_weld_yorn);
				record.set('wdsf_rate_name', values.wdsf_rate_name);


				var rec;
				for (var i = 0; i < store2.data.items.length; i++) {
					if(record.get('line_seqn') == store2.data.items[i].data.line_seqn){
						//같은 seqn 수정.
						var row = store2.find('line_seqn', record.get('line_seqn'));
						rec = store2.getAt(row);
						break;
					}
				}

				rec.set('base_name', values.base_name);
				rec.set('brnd_bacd', values.brnd_bacd);
				rec.set('ispl_name', values.ispl_name);
				rec.set('wndw_modl_idcd', values.wndw_modl_idcd);
				rec.set('wdgr_idcd', values.wdgr_idcd);
				rec.set('wdgr_name', values.wdgr_name);
				rec.set('modl_name', values.modl_name);
				rec.set('invc_qntt', values.invc_qntt);
				rec.set('wdtp_name', values.wdtp_name);
				rec.set('wdbf_itid', values.wdbf_itid);
				rec.set('wdsf_itid', values.wdsf_itid);
				rec.set('item_widh', values.item_widh);
				rec.set('item_hght', values.item_hght);
				rec.set('item_widh_1fst', values.item_widh_1fst);
				rec.set('item_hght_1fst', values.item_hght_1fst);
				rec.set('inwp_itid', values.inwp_itid);
				rec.set('otwp_itid', values.otwp_itid);
				rec.set('ings_tick', values.ings_tick);
				rec.set('otgs_tick', values.otgs_tick);
				rec.set('wdbf_incl_yorn', values.wdbf_incl_yorn);
				rec.set('wdsf_incl_yorn', values.wdsf_incl_yorn);
				rec.set('vent_plac_dvcd', vent_plac_dvcd);
				rec.set('rpst_wryp_name', values.rpst_wryp_name);
				rec.set('bycv_incl_yorn', values.bycv_incl_yorn);
				rec.set('bfrn_incl_yorn', values.bfrn_incl_yorn);
				rec.set('moss_incl_yorn', values.moss_incl_yorn);
				rec.set('moss_itid', values.moss_itid);
				rec.set('hndl_hght', values.hndl_hght);
				rec.set('esti_trff', values.esti_trff);
				rec.set('remk_text', values.remk_text);
				rec.set('glss_amnt_incl_yorn', values.glss_amnt_incl_yorn);
				rec.set('wdbf_auto_cutt_yorn', values.wdbf_auto_cutt_yorn);
				rec.set('wdbf_auto_weld_yorn', values.wdbf_auto_weld_yorn);
				rec.set('wdsf_auto_cutt_yorn', values.wdsf_auto_cutt_yorn);
				rec.set('wdsf_auto_weld_yorn', values.wdsf_auto_weld_yorn);
				rec.set('wdsf_rate_name', values.wdsf_rate_name);
			}

			//파라미터 삭제
			me.popup.params = undefined;

		}else{
			var seq = uper_seqn + 1;
			var dsp = uper_seqn + 1;
			record = Ext.create( store.model.modelName , {
				line_seqn		: seq,
				brnd_bacd		: values.brnd_bacd,			//브랜드코드
				base_name		: values.base_name,			//브랜드명
				wdgr_idcd		: values.wdgr_idcd,			//창호그룹ID
				wdgr_name		: values.wdgr_name,			//창호그룹명
				wdtp_idcd		: values.wdtp_idcd,			//창호형태ID
				wndw_modl_idcd	: values.wndw_modl_idcd,	//창호모델ID
				modl_name		: values.modl_name,			//모델명
				invc_qntt		: values.invc_qntt,			//수량
				ispl_name		: values.ispl_name,			//설치위치
				wdbf_itid		: values.wdbf_itid,			//BF품목ID
				wdsf_itid		: values.wdsf_itid,			//SF품목ID
				item_widh		: values.item_widh,			//길이
				item_hght		: values.item_hght,			//높이
				item_widh_1fst	: values.item_widh_1fst,	//길이1
				item_hght_1fst	: values.item_hght_1fst,	//높이1
				inwp_itid		: values.inwp_itid,			//내부랩핑품목ID
				otwp_itid		: values.otwp_itid,			//외부랩핑품목ID
				ings_tick		: values.ings_tick,			//내부유리두께
				otgs_tick		: values.otgs_tick,			//외부유리두께
				vent_plac_dvcd	: vent_plac_dvcd,			//vent위치구분코드
				rpst_wryp_name	: values.rpst_wryp_name,	//대표래핑명
				bfrn_incl_yorn	: values.bfrn_incl_yorn,	//bf보강재포함여부
				wdbf_incl_yorn	: values.wdbf_incl_yorn,	//창틀포함여부
				wdsf_incl_yorn	: values.wdsf_incl_yorn,	//창짝포함여부
				moss_incl_yorn	: values.moss_incl_yorn,	//방충망포함여부
				moss_itid		: values.moss_itid,			//방충망품목ID
				hndl_hght		: values.hndl_hght,			//핸들높이
				esti_trff		: values.esti_trff,			//견적요율
				remk_text		: values.remk_text,			//비고
				wdsf_rate_name	: values.wdsf_rate_name,	//창형태 = 창짝비율명
				glss_amnt_incl_yorn	: values.glss_amnt_incl_yorn,	//유리금액포함여부
				wdbf_auto_cutt_yorn	: values.wdbf_auto_cutt_yorn,	//BF자동절단여부
				wdbf_auto_weld_yorn	: values.wdbf_auto_weld_yorn,	//BF자동용접여부
				wdsf_auto_cutt_yorn	: values.wdsf_auto_cutt_yorn,	//SF자동절단여부
				wdsf_auto_weld_yorn	: values.wdsf_auto_weld_yorn,	//SF자동용접여부
			});
			store.add(record);
			store2.add(record);
		}
		me.down('form').getForm().reset(true);
	},

	closeAction : function(){
		var me = this,
			popup = Ext.ComponentQuery.query('module-estientry2-popup')[0]
		;

		popup.close();
	},

	select : function(){
		var me = this,
			editor	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0]
			values	= editor.getValues(),
			popup	= Ext.ComponentQuery.query('module-estientry2-popup')[0],
			westGrid= popup.down('grid'),
			select  = westGrid.getSelectionModel().getSelection()[0],
			tabpanel= popup.down('[itemId=mtrlItem]'),
			active	= tabpanel.getActiveTab(),
			index	= tabpanel.items.indexOf(active);
		;
		if(index == 3){
			me.getStore().load({
				params	: {
					param:JSON.stringify({
						invc_numb : values.invc_numb,
						line_seqn : select.get('line_seqn'),
						brnd_bacd : '04',
						all       : me.down('[name=bfsf_dvcd]').getValue(),
						bf        : me.down('[name=bfsf_dvcd1]').getValue(),
						sf        : me.down('[name=bfsf_dvcd2]').getValue(),
						mf        : me.down('[name=bfsf_dvcd3]').getValue(),
					})}, scope:this,
				callback:function(records, operation, success) {
				}
			});
		}
	}


});
