package com.baroservice.api.corpstate;

import java.rmi.RemoteException;

import com.baroservice.api.BarobillApiProfile;
import com.baroservice.api.BarobillApiService;
import com.baroservice.ws.CorpState;

/**
 * 바로빌 휴폐업조회 API 샘플
 */
public class Tests {

	/**
	 * 바로빌 API 정의 클래스
	 *
	 * 환경에 따라 BarobillApiProfile 를 지정해주세요.
	 */
	private BarobillApiService barobillApiService;

	public Tests() {
		barobillApiService = new BarobillApiService(BarobillApiProfile.TESTBED);
	}

	/**
	 * GetCorpState - 단건 조회
	 */
	public void GetCorpState() throws RemoteException {

		String certKey = "";			// 인증키
		String corpNum = "";			// 바로빌 회원 사업자번호 ('-' 제외, 10자리)
		String checkCorpNum = "";

		CorpState result = barobillApiService.corpState.getCorpState(certKey, corpNum, checkCorpNum);

		System.out.println(result);

	}

	/**
	 * GetCorpStates - 대량 조회
	 */
	public void GetCorpStates() throws RemoteException {
		String certKey = "";			//인증키
		String corpNum = "";			//연계사업자 사업자번호 ('-' 제외, 10자리)

		String[] checkCorpNumList = new String[2];	//확인할 사업자번호 ('-' 제외, 10자리)
		checkCorpNumList[0] = "";
		checkCorpNumList[1] = "";

		CorpState[] result = barobillApiService.corpState.getCorpStates(certKey, corpNum, checkCorpNumList);

		System.out.println(result);
	}

	/**
	 * GetCorpStateScrapRequestURL - 휴폐업 서비스 신청 URL
	 */
	public void GetCorpStateScrapRequestURL() throws RemoteException {

		String certKey = "";			// 인증키
		String corpNum = "";			// 바로빌 회원 사업자번호 ('-' 제외, 10자리)
		String id = "";				// 바로빌 회원 아이디
		String pwd = "";				// 바로빌 회원 비밀번호

		String result = barobillApiService.corpState.getCorpStateScrapRequestURL(certKey, corpNum, id, pwd);

		System.out.println(result);

	}

}
