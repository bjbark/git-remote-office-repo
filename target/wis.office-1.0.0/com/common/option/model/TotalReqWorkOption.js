Ext.define('com.common.option.model.TotalReqWorkOption', { extend:'Ext.data.Model',
    fields: [
        { name : 'm_visitdcrate'   		, type:'string' }, // 문구 방문추가할인율
        { name : 'm_salelimits1'   		, type:'string' }, // 문구 매출구간1
        { name : 'm_salelimits2'   		, type:'string' }, // 문구 매출구간2
        { name : 'm_salelimits3'   		, type:'string' }, // 문구 매출구간3
        { name : 'm_salelimits4'   		, type:'string' }, // 문구 매출구간4
        { name : 'm_dcrate1'			, type:'string' }, // 문구 할인율1
        { name : 'm_dcrate2'			, type:'string' }, // 문구 할인율2
        { name : 'm_dcrate3'			, type:'string' }, // 문구 할인율3
        { name : 'm_dcrate4'			, type:'string' }, // 문구 할인율4
        { name : 't_salelimits1'		, type:'string' }, // 테크 매출구간1
        { name : 't_salelimits2'		, type:'string' }, // 테크 매출구간2
        { name : 't_salelimits3'		, type:'string' }, // 테크 매출구간3
        { name : 't_salelimits4'		, type:'string' }, // 테크 매출구간4
        { name : 't_dcrate1'			, type:'string' }, // 테크 할인율1
        { name : 't_dcrate2'			, type:'string' }, // 테크 할인율2
        { name : 't_dcrate3'			, type:'string' }, // 테크 할인율3
        { name : 't_dcrate4'			, type:'string' }, // 테크 할인율4
        { name : 'user_msg'  			, type:'string'},  /* 출력 메세지 */
        { name : 'bank_nm' 		 		, type:'string'},  /* 은행명 */
        { name : 'acct_no'  			, type:'string'},  /* 입금계좌 */
        { name : 'acct_own_nm'  			, type:'string'},  /* 입금자명 */
        { name : 'work_phone_no'  		, type:'string'},  /* 담당자 전화 4 */
        { name : 'work_nm'  			, type:'string'}   /* 담당자 명 4 */

    ]
});
