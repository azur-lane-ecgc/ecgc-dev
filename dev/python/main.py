from aa_parsing import aa
from ehp_parsing import ehp
from end_game_al_rankings import mainfleetrankings, ssfleetrankings, vgfleetrankings
from changelog import changelog

def run_all():
    print("Running: aa_parsing/aa.py")
    aa.main()
    print()

    print("Running: ehp_parsing/ehp.py")
    ehp.main()
    print()

    print("Running: end_game_al_rankings/mainfleetrankings.py")
    mainfleetrankings.main()
    print()

    print("Running: end_game_al_rankings/vgfleetrankings.py")
    vgfleetrankings.main()
    print()

    print("Running: end_game_al_rankings/ssfleetrankings.py")
    ssfleetrankings.main()
    print()

    print("Running: changelog/changelog.py")
    changelog.main()
    print()

    print("All python tools have been run successfully.")

if __name__ == "__main__":
    run_all()