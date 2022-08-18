import datetime


def auto_generate_title() -> str:
    """take today' date as title automatically

    Returns:
        str: today's date
    """
    today = datetime.date.today()
    return today
